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
 details: String,
 date: Date,
 time: String,
});

const User = mongoose.model("User", UserSchema);
const Event = mongoose.model("Event", EventSchema)

module.exports = User;