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

// TODO: improve error handling
async function updatePastBook(req, res) {
  // TODO: improve input validations
  const selectedPictures = req.body.selectedPictures || [];
  const newData = {
    selectedPictures,
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
