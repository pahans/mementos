const PastBook = require("../models/past-book");

async function fetchPastBook(req, res) {
  await PastBook.findOne({ _id: req.params.bookId }).then((data) => {
    if (!data) {
      res.json({ selectedPictures: [] });
    } else {
      res.json(data);
    }
  });
}

async function updatePastBook(req, res) {
  const selectedPictures = req.body.selectedPictures || [];
  const galleryId = req.body.galleryId;
  console.log(req.body);
  const newData = {
    selectedPictures,
    galleryId,
  };
  await PastBook.findOneAndUpdate({ _id: req.params.bookId }, newData, {
    upsert: true,
  }).then(() => {
    res.json({ status: "success" });
  });
}

module.exports = {
  fetchPastBook,
  updatePastBook,
};
