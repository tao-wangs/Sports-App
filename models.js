const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  location: String,
  date: Date,
});

const User = mongoose.model("User", UserSchema);
const Event = mongoose.model("Event", EventSchema);

module.exports = User;
module.exports = Event;
