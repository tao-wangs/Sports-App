const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const EventSchema = new mongoose.Schema({
 name: {
   type: String,
   required: true,
 },
 location: String,
 date: String, //change this to Date at a later stage
 time: String,
});

const User = mongoose.model("User", UserSchema);
const Event = mongoose.model("Event", EventSchema)

module.exports = User;
module.exports = Event;