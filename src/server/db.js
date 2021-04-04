const mongoose = require("mongoose");
const url = process.env.MONGO_URL || "mongodb://localhost:27017/mementos";
function initDb() {
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  }).catch((e)=>{
    console.error("error connecting to database");
  });
}

module.exports = initDb;
