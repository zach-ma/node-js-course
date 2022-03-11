const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const api = require("./routes/api");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
  })
); // cors middleware
app.use(morgan("combined"));

app.use(express.json()); // middleware: parse incoming json from incoming request
app.use(express.static(path.join(__dirname, "..", "public"))); // load frontend
app.use("/v1", api); // Versioning Node APIs

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
