const http = require("http");
const mongoose = require("mongoose");

const app = require("./app"); // express code
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://nasa-api:DMc0MxyoFJs9wyiM@nasa-cluster.gj6z7.mongodb.net/nasa?retryWrites=true&w=majority";

const server = http.createServer(app);

// event emitter, only triggered once
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);

  // Loading Data On Startup
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
