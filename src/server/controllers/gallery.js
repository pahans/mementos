const gallery2270 = require("./gallery-2270.json");

async function fetchGallery(req, res) {
  res.json(gallery2270);
}

module.exports = {
  fetchGallery,
};
