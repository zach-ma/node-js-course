const request = require("postman-request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

// geocode("Boston", (error, data) => {
//   console.log("Error: ", error);
//   console.log("Data: ", data);

//   forecast(-75.7088, 44.1545, (error, data) => {
//     console.log("Error", error);
//     console.log("Data", data);
//   });
// });

// console.log(process.argv);
const address = process.argv[2];

if (!address) {
  console.log("Please provide an address");
} else {
  geocode(address, (error, data) => {
    if (error) {
      return console.log(error); // use return to stop function
    }
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return console.log(error); // use return to stop function
      }

      console.log(data.place);
      console.log(forecastData);
    });
  });
}
