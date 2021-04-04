const PastBook = require("../models/past-book");

async function fetchPastBook(req, res) {
  await PastBook.findOne({ _id: req.params.bookId }).then((data) => {
    if (!data) {
      res.json({ selectedPictures: [] });
    } else {
      res.json(data);
    }
  }).catch((e)=>{
    res.json({ status: "failed", selectedPictures: [] });
    console.error("could not get data from the database: ", e);
  })
}

async function updatePastBook(req, res) {
  const selectedPictures = req.body.selectedPictures || [];
  const galleryId = req.body.galleryId;
  const newData = {
    selectedPictures,
    galleryId,
  };
  await PastBook.findOneAndUpdate({ _id: req.params.bookId }, newData, {
    upsert: true,
  }).then(() => {
    res.json({ status: "success" });
  }).catch((e)=>{
    res.json({ status: "failed" });
    console.error("could not save data to the database : ", e);
  });
}

module.exports = {
  fetchPastBook,
  updatePastBook,
};
