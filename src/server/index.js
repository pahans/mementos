const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const initDb = require("./db");
var pastBookApi = require("./routes/api");

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3005;
const PUBLIC_PATH = path.join(__dirname, "/../../build/");

app.use(express.static(PUBLIC_PATH));
app.use("/api/v1", pastBookApi);

app.listen(PORT, () => {
  initDb();
  console.log(`Example app listening at http://localhost:${PORT}`);
});

module.exports = app;
