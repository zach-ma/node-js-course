const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    // event loop is blocked...
  }
}

app.get("/", (req, res) => {
  /////// real life blocking functions:
  /**
   * JSON.stringify({}) => "{}"
   * JSON.parse("{}") => {}
   * [......].sort()
   * crypto
   */
  res.send(`Performance example ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(9000);
  res.send(`Ding! ${process.pid}`);
});

console.log("Running server.js...");
if (cluster.isMaster) {
  console.log("Master has been started...");

  const NUM_WORKERS = os.cpus().length;
  console.log(NUM_WORKERS + " cores");
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
} else {
  console.log("Worker process started.");
  app.listen((PORT = 3000), () => {
    console.log(`Listening on port ${PORT}...`);
  });
}
