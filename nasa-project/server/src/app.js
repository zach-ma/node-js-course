const express = require("express");
const cors = require("cors");

const planetsRouter = require("./routes/planets/planets.router");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4000",
  })
); // cors middleware
app.use(express.json()); // middleware: parse incoming json from incoming request
app.use(planetsRouter);

module.exports = app;
