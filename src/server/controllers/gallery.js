const gallery2270 = require("./gallery-2270.json");

async function fetchGallery(req, res) {
  console.log(req.params)
  res.json(gallery2270);
}

module.exports = {
  fetchGallery,
};
