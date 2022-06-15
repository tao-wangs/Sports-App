const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  hosting: [ObjectId],
  attending: [ObjectId],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
