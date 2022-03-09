const express = require("express");

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
  res.send("Performance example");
});

app.get("/timer", (req, res) => {
  delay(5000);
  res.send("Ding!");
});

app.listen((PORT = 3000), () => {
  console.log(`Listening on port ${PORT}...`);
});
