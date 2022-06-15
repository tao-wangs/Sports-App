const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require("uuid");

//database stuff starts here
const Event = require("./Event");
const User = require("./User");

const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://user:a16iZmbulAApdLuP@cluster0.mbyye.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.error("Connected to Mongoose Database"));

//database stuff ends here

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
    res.status(401).json({ message: "Invalid Cookie" });
  } else {
    findAttending(userId).then((x) => {
      res.json({ events: x });
    });
  }
});

app.get("/get_hosting", (req, res) => {
  const userId = sessions[req.cookies.sessionID];
  if (userId == undefined) {
    res.status(401).json({ message: "Invalid Cookie" });
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

app.post("/get_user_id", (req, res) => {
  res.json({ user: sessions[req.cookies.sessionID] });
});

app.post("/post_rsvp", (req, res) => {
  rsvpEvent(req.body.event, req.body.user).then(() => {
    res.status(200).json({ message: "Interest registered" });
  });
});

app.post("/post_event", (req, res) => {
  const userId = sessions[req.cookies.sessionID];
  if (userId === undefined) {
    res.status(401).json({ message: "Invalid Cookie" });
  } else {
    const event = new Event(req.body);
    event
      .save()
      .then((user) => {
        res.json("Event added successfully");
      })
      .catch((err) => {
        res.status(400).send("Failed to save event");
      });
    hostEvent(event._id, userId);
  }
});

app.post("/post_signup", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((user) => {
      res.json("User added successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Failed to save user");
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
        console.log("successful login");
        const id = uuidv4();
        sessions[id] = x[0]._id;
        res
          .clearCookie("sessionID")
          .cookie("sessionID", id)
          .json({ message: "Login successful!" });
      } else {
        console.log("login unsuccessful");
        res.status(401).json({ message: "Incorrect login credentials" });
      }
    }
  });
});

findEvents = async () => {
  return await Event.find({});
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
