const mongoose = require("mongoose");

const pastBookCollectionSchema = new mongoose.Schema({
  _id: { type: String },
  selectedPictures: { type: Array, default: [], required: true },
  galleryId: { type: String, required: true },
});
const PastBook = mongoose.model("PastBook", pastBookCollectionSchema);

module.exports = PastBook;
