const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes.js");

console.log(process.argv);

// customize yargs version
yargs.version("1.1.0");

// create add command
yargs.command({
  command: "add",
  describe: " Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
    // console.log("Title: " + argv.title);
    // console.log("Body: " + argv.body);
    // console.log("Adding a new note!", argv);
  },
});

// create remove command
yargs.command({
  command: "remove",
  describe: "Remove a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("Removing a new note!");
    notes.removeNote(argv.title);
  },
});

// create list command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  },
});

// create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    // console.log("Reading a note!");
    notes.readNote(argv.title);
  },
});

// console.log(yargs.argv);
yargs.parse(); // NOTE
