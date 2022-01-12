const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Find paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// Setup route handlers
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Andrew",
  });
});
// app.get("", (req, res) => {
//   res.send("<h1>Weather</h1>");
// });

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Andrew",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful text",
    title: "Help",
    name: "Andrew",
  });
});

app.get("/weather", (req, res) => {
  res.send({
    place: "Philadelphia, Pennsylvania, United States",
    temperature: 7,
    feelslike: 4,
    weather_descriptions: "Partly cloudy",
  });
});

// 404 page handler comes last
// specific 404 errors
app.get("/help/*", (req, res) => {
  // res.send("Help article not found");
  res.render("404", {
    title: "404",
    name: "Andrew",
    errorMessage: "Help article not found",
  });
});

// generic 404 errors
// * matches anything that hasn't been matched so far
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Andrew",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
