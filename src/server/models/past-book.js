const mongoose = require("mongoose");

const pastBookCollectionSchema = new mongoose.Schema({
  _id: { type: String },
  selectedPictures: { type: Array, default: [] },
});
const PastBook = mongoose.model("PastBook", pastBookCollectionSchema);

module.exports = PastBook;
