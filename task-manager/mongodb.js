// CRUD
// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require("mongodb");

// connect to localhost server
const connectionURL = "mongodb://127.0.0.1:27017"; // use full IP
const databaseName = "task-manager";

const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
console.log(id.id); // binary data
console.log(id.id.length); // 12
console.log(id.toHexString());
console.log(id.toHexString().length);

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("Unable to connect to database!");
    }
    console.log("Connected correctly!");

    const db = client.db(databaseName);

    ///////////// CREATE

    // db.collection("users").insertOne(
    //   {
    //     // _id: id,
    //     name: "Vikram",
    //     age: 26,
    //   },
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert user");
    //     }
    //     console.log(result.insertedId);
    //   }
    // );

    // db.collection("users").insertMany(
    //   [
    //     {
    //       name: "Jen",
    //       age: 28,
    //     },
    //     {
    //       name: "Gunther",
    //       age: 27,
    //     },
    //   ],
    //   (error, result) => {
    //     if (error) {
    //       return console.log("Unable to insert documents");
    //     }
    //     console.log(result.insertedIds);
    //   }
    // );

    ///////////// READ

    // db.collection("users").findOne({ name: "Jen", age: 1 }, (error, user) => {
    // db.collection("users").findOne(
    //   { _id: new ObjectID("61e09cac2af62ceb5df07952") },
    //   (error, user) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }
    //     console.log(user);
    //   }
    // );

    // db.collection("users")
    //   .find({ age: 27 })
    //   .toArray((error, users) => {
    //     console.log(users);
    //   });

    // db.collection("users")
    //   .find({ age: 27 })
    //   .count((error, count) => {
    //     console.log(count);
    //   });

    // db.collection("tasks").findOne(
    //   { _id: new ObjectID("61e092089e89b1db6e8451b3") },
    //   (error, task) => {
    //     if (error) {
    //       return console.log("Unable to fetch");
    //     }
    //     console.log(task);
    //   }
    // );

    // db.collection("tasks")
    //   .find({ completed: false })
    //   .toArray((error, tasks) => {
    //     console.log(tasks);
    //   });

    ///////////// UPDATE
    // db.collection("users")
    //   .updateOne(
    //     {
    //       _id: new ObjectID("61e090515126daede99b36ec"),
    //     },
    //     {
    //       //   $set: {
    //       //     name: "Mike",
    //       //   },
    //       $inc: {
    //         age: 1,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    // db.collection("tasks")
    //   .updateMany(
    //     { completed: false },
    //     {
    //       $set: {
    //         completed: true,
    //       },
    //     }
    //   )
    //   .then((result) => {
    //     console.log(result.modifiedCount);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    ///////////// DELETE
    db.collection("users")
      .deleteMany({
        age: 21,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
