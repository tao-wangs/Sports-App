const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "uploads/" });

//database stuff starts here
const Event = require("./Event");
const User = require("./User");
const Image = require("./Image");

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://user:a16iZmbulAApdLuP@cluster0.mbyye.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.error("Connected to Mongoose Database"));

//database stuff ends here

const categories = {
  athletic: ["running", "high jump", "pole vault"],
  ball: ["football", "rugby"],
  racket: ["badminton", "tennis"],
  martial_arts: ["karate", "judo"],
  bat: ["cricket", "baseball"],
  water: ["swimming", "rowing"],
};

var sessions = {};

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "drp14", "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "drp14", "build", "index.html"));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/get_attending", (req, res) => {
  const userId = sessions[req.cookies.sessionID];
  if (userId == undefined) {
    res.status(401).json({ message: "User not logged in!" });
  } else {
    findAttending(userId).then((x) => {
      res.json({ events: x });
    });
  }
});

app.get("/get_hosting", (req, res) => {
  const userId = sessions[req.cookies.sessionID];
  if (userId == undefined) {
    res.status(401).json({ message: "User not logged in!" });
  } else {
    findHosting(userId).then((x) => {
      res.json({ events: x });
    });
  }
});
// create a GET route
app.get("/get_events", (req, res) => {
  findEvents().then((x) => {
    res.send({ events: x });
  });
});

app.post("/get_user", (req, res) => {
  findUser(req.body.email).then((x) => {
    res.send({ users: x.length });
  });
});

app.post("/upload_image", upload.single("image"), (req, res, next) => {
  const data = fs.readFileSync(req.file.path);
  const image = new Image({ data: data, contentType: req.file.mimetype });
  image
    .save()
    .then((user) => {
      res.json({ _id: image._id });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Failed to save event" });
    });
});

app.post("/get_images", (req, res) => {
  findImages(req.body.event).then((x) => {
    res.send({ images: x });
  });
});

app.post("/filter_events", (req, res) => {
  if (
    !req.body.query.include.length &&
    !req.body.query.exclude.length &&
    !req.body.query.categories.length
  ) {
    findEvents().then((x) => {
      res.send({ events: x });
    });
  } else {
    findFilteredEvents(req.body.query).then((x) => {
      res.send({ events: x });
    });
  }
});

app.post("/get_user_id", (req, res) => {
  if (!sessions[req.cookies.sessionID]) {
    res.status(401).json({ message: "User not logged in!" });
  } else {
    res.json({ user: sessions[req.cookies.sessionID] });
  }
});

app.post("/post_rsvp", (req, res) => {
  rsvpEvent(req.body.event, req.body.user).then(() => {
    res.status(200).json({ message: "Spot reserved" });
  });
});

app.post("/post_event", (req, res) => {
  const userId = sessions[req.cookies.sessionID];
  if (userId === undefined) {
    res.status(401).json({ message: "User not logged in!" });
  } else {
    const event = new Event(req.body);
    event
      .save()
      .then((user) => {
        res.json({ message: "Event added successfully" });
      })
      .catch((err) => {
        res.status(400).json({ message: "Failed to save event" });
      });
    hostEvent(event._id, userId);
  }
});

app.post("/post_signup", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.json({ message: "User added successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Failed to save user" });
    });
});

app.post("/post_login", (req, res) => {
  findUser(req.body.email).then((x) => {
    if (x.length != 1) {
      res
        .status(401)
        .json({ message: `No user found with email: ${req.body.email}` });
    } else {
      if (req.body.password === x[0].password) {
        const id = uuidv4();
        sessions[id] = x[0]._id;
        res
          .clearCookie("sessionID")
          .cookie("sessionID", id)
          .json({ message: "Login successful!" });
      } else {
        res.status(401).json({ message: "Incorrect login credentials" });
      }
    }
  });
});

findEvents = async () => {
  return await Event.find({});
};

findFilteredEvents = async (sport) => {
  console.log(sport.categories);
  sport.include = [
    ...sport.include,
    ...sport.categories.map((x) => categories[x]).flat(),
  ];
  console.log(sport.include);

  if (sport.include.length === 0) {
    return await Event.find({ sport: { $nin: sport.exclude } });
  }

  return await Event.find({
    sport: { $in: sport.include, $nin: sport.exclude },
  });
};

findUser = async (foo) => {
  return await User.find({ email: foo });
};

rsvpEvent = async (event, user) => {
  await Event.updateOne({ _id: event }, { $push: { attendees: user } });
  await User.updateOne({ _id: user }, { $push: { attending: event } });
};

findAttending = async (userid) => {
  const user = await User.findOne({ _id: userid });
  return await Event.find({ _id: { $in: user.attending } });
};

findHosting = async (userid) => {
  const user = await User.findOne({ _id: userid });
  return await Event.find({ _id: { $in: user.hosting } });
};

hostEvent = async (event, user) => {
  await User.updateOne({ _id: user }, { $push: { hosting: event } });
};

findImages = async (event) => {
  return await Image.find({ _id: { $in: event.images } });
};
