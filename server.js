const express = require("express");
const path = require("path");

//database stuff starts here
const Event = require('./models');

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://user:a16iZmbulAApdLuP@cluster0.mbyye.mongodb.net/?retryWrites=true&w=majority',
  {useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.error("Connected to Mongoose Database"));

const events = [
  new Event({
    name: "Football Taster Session",
    location: "At Buckingham Palace",
    date: "10/06/22",
    time: "12:00 PM"
    }),
  new Event({
    name: "One off game",
    location: "At London Bridge",
    date: "08/06/22",
    time: "12:00 AM"
    }),
  new Event({
    name: "Lorem Ipsum",
    location: "At Dolores Sit Amet",
    date: "08/06/22",
    time: "2:45 PM"
    }),
  new Event({
    name: "Fox Hunting",
    location: "At 10 Downing Street",
    date: "08/06/22",
    time: "6:00 PM"
    })
  ]

//events.map(e => 
//  { e.save().then(async () => console.log('Event %s saved to database', e.name))});

//database stuff ends here

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "drp14", "build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "drp14", "build", "index.html"));
});

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`));

// create a GET route
app.get("/get_events", (req, res) => {
  res.send({
    //events: findEvents()});
    events: [
      "Football Taster Session\nAt Buckingham Palace\n10/06/22, 12:00 PM",
      "One off game\nAt London Bridge\n08/06/22, 12:00 AM",
      "Lorem Ipsum\nAt Dolores Sit Amet\n08/06/22, 2:45 PM",
      "Fox Hunting\nAt 10 Downing Street\n08/06/22, 6:00 PM",
    ],
  });
});


findEvents = async () => {
  const events = await Event.find({});
  const formattedEvents = events.map(e => e.name + "\n" + e.location + "\n" + e.date + ", " + e.time);
  return formattedEvents;
}