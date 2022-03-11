const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:DMc0MxyoFJs9wyiM@nasa-cluster.gj6z7.mongodb.net/nasa?retryWrites=true&w=majority";

// event emitter, only triggered once
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});
mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
