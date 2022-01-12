const https = require("https");

const url =
  "https://api.weatherstack.com/current?access_key=24ca674f66732bbff766b547f73a8a09&query=37.82";

const request = https.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data = data + chunk.toString();
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => {
  console.log("An error", error);
});

request.end();
