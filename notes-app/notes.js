// console.log("notes.js loaded");

const chalk = require("chalk");
const fs = require("fs");

const getNotes = () => "Your notes...";

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const addNote = (title, body) => {
  // load the existing note
  const notes = loadNotes();

  // check duplicate title (error handling)
  //   const duplicateNotes = notes.filter((note) => note.title === title);
  const duplicateNote = notes.find((note) => note.title === title);

  //   debugger;

  //   if (duplicateNotes.length === 0) {
  if (!duplicateNote) {
    // add
    notes.push({
      title,
      body,
    });

    // save
    saveNotes(notes);

    console.log("New note added!");
  } else {
    console.log("Note title taken!");
  }

  console.log(notes);
};

const removeNote = (title) => {
  // load the existing note
  const notes = loadNotes();

  // remove
  const notesToKeep = notes.filter((note) => note.title !== title);

  // print msg
  if (notesToKeep.length < notes.length) {
    console.log(chalk.green.inverse("Note removed!"));
  } else {
    console.log(chalk.red.inverse("No note found!"));
  }

  // save
  saveNotes(notesToKeep);
};

const listNotes = () => {
  console.log(chalk.inverse("Your notes:"));

  const notes = loadNotes();

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => title === note.title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.error(chalk.red("Note not found!"));
  }
};

module.exports = { getNotes, addNote, removeNote, listNotes, readNote };
