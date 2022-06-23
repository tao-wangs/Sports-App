const mongoose = require("mongoose");

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sports: {
    type: [String],
    required: true,
  },
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
