const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

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

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "drp14", "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "drp14", "build", "index.html"));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post("/post_event", (req, res) => {
  const event = new Event(req.body);
  event
    .save()
    .then((user) => {
      res.json("Event added successfully");
    })
    .catch((err) => {
      res.status(400).send("Failed to save event");
    });
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
      res.status(400).send("eailed to save user");
    });
});

app.post("/post_login", (req, res) => {
  findUser(req.body.email).then((x) => {
    if (x.length != 1) {
      res.status(400).send(`No user found with email: ${x}`);
    } else {
      res.send({ result: req.body.password === x[0].password });
    }
  });
});

findEvents = async () => {
  return await Event.find({});
};

findUser = async (foo) => {
  return await User.find({ email: foo });
};
