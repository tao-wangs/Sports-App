const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  date: Date,
  duration: String,
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
