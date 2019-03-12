const fs = require("fs");

const saveNotes = value => {
  fs.writeFileSync("notes.json", JSON.stringify(value), err => {
    if (err) {
      console.log(err);
    }
  });
};

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync("notes.json");
    return JSON.parse(notesString);
  } catch (error) {
    return [];
  }
};

const addNote = (title, body) => {
  let notes = fetchNotes();
  const orignalNote = {
    title,
    body
  };

  fetchNotes();

  const duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(orignalNote);
    // Saving in notes.json
    saveNotes(notes);
    return orignalNote;
  }
};

const deleteNote = title => {
  const notes = fetchNotes();
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const showList = () => {
  return fetchNotes();
};

const readNote = title => {
  const notes = fetchNotes();
  const note = notes.filter(note => note.title === title);
  return note[0];
};

const logNote = note => {
  console.log(`
  " -------------- "
  Title : ${note.title}
  Body : ${note.body}`);
};

module.exports = {
  addNote,
  deleteNote,
  showList,
  readNote,
  logNote
};
