const PastBook = require("../models/past-book");

/**
 * book id is hardcoded because we have not implementated users yet and we only support saving for one pastbook only.
 * book id should passed to the API in the proper implementation
 */
const BOOK_ID = "demo-book-id";

async function fetchPastBook(req, res) {
  await PastBook.findOne({ _id: BOOK_ID }).then((data) => {
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
  console.log(selectedPictures);
  const newData = {
    selectedPictures,
  };
  await PastBook.findOneAndUpdate({_id: BOOK_ID}, newData, { upsert: true }).then(() => {
    res.json({ status: "success" });
  });
}

module.exports = {
  fetchPastBook,
  updatePastBook,
};
