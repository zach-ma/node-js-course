const express = require("express");
const path = require("path");

const friendsRouter = require("./routes/friends.router");
const messagesRouter = require("./routes/messages.router");

const app = express();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

const PORT = 4000;

// middleware 1
app.use((req, res, next) => {
  const start = Date.now();
  next();
  const delta = Date.now() - start;
  console.log(`${req.method} ${req.baseUrl}${req.url} ${delta}ms`);
});

// middleware 2 - serve static file
app.use("/site", express.static(path.join(__dirname, "public")));

// middleware 3
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index", {
    title: "My Friends Are Very Clever",
    caption: "Let's go skiing",
  });
});
app.use("/friends", friendsRouter);
app.use("/messages", messagesRouter);

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}...`);
});
