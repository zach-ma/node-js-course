const path = require("path");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const planetsRouter = require("./routes/planets/planets.router");
const launchesRouter = require("./routes/launches/launches.router");
const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
  })
); // cors middleware
app.use(morgan("combined"));

app.use(express.json()); // middleware: parse incoming json from incoming request
app.use(express.static(path.join(__dirname, "..", "public"))); // load frontend

app.use("/planets", planetsRouter);
app.use("/launches", launchesRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
