const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  enddate: Date,
  sport: {
    type: String,
    required: true,
  },
  attendees: [ObjectId],
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
