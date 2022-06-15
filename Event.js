const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  date: Date,
  duration: String,
  attendees: [ObjectId]
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
