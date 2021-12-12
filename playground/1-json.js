const fs = require("fs");

////////////////////////////////
//////// write
// const book = {
//   title: "Ego is the Enemy",
//   author: "Ryan Holiday",
// };

// const bookJSON = JSON.stringify(book);
// console.log(bookJSON);
// console.log(bookJSON.title);

// const parsedData = JSON.parse(bookJSON);
// console.log(parsedData.title);

// fs.writeFileSync("1-json.json", bookJSON); // filename + data

////////////////////////////////
//////// read
// const dataBuffer = fs.readFileSync("1-json.json"); // load data
// console.log(dataBuffer);
// const dataJSON = dataBuffer.toString(); // parse binary data to string
// const data = JSON.parse(dataJSON); // parse string to object
// console.log(data.title);

////////////////////////////////
//////// challenge
const dataBuffer = fs.readFileSync("1-json2.json"); // load data
const dataJSON = dataBuffer.toString(); // parse binary data to string
const data = JSON.parse(dataJSON); // parse string to object
console.log(data.title);
data.name = "Zach";
data.planet = "Mars";
data.age = 20;
console.log(data);
const newJSON = JSON.stringify(data); // stringify
console.log(newJSON);
fs.writeFileSync("1-json2.json", newJSON);
