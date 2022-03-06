const http = require("http");
const PORT = 4000;

const friends = [
  {
    id: 0,
    name: "Nikola Tesla",
  },
  {
    id: 1,
    name: "Sir Isaac Newton",
  },
  {
    id: 2,
    name: "Albert Einstein",
  },
];

const server = http.createServer();
server.on("request", (req, res) => {
  console.log(req.url);
  const items = req.url.split("/");
  console.log(items);

  // /friends/2 => ['','friends','2']
  if (req.method === "POST" && items[1] === "friends") {
    req.on("data", (data) => {
      // data in JSON format that browser passed to the server is received as a buffer
      const friend = data.toString(); // buffer->string
      console.log("Request:", friend);
      friends.push(JSON.parse(friend)); // string->object
    });
    req.pipe(res);
  } else if (req.method === "GET" && items[1] === "friends") {
    // res.writeHead(200, {
    //   "Content-Type": "application/json",
    // });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 3) {
      const friendIndex = +items[2];
      console.log(JSON.stringify(friends[friendIndex]));
      res.end(JSON.stringify(friends[friendIndex]));
    } else {
      console.log(JSON.stringify(friends));
      res.end(JSON.stringify(friends));
    }
  } else if (req.method === "GET" && req.url === "messages") {
    // statusCode is set to 200 by default
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<li>Hello Isaac!</li>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
}); // 127.0.0.1 => localhost
