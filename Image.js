const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const ImageSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String
});

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
