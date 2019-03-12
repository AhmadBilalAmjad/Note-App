const yargs = require("yargs");
const notes = require("./notes");

const titleOptions = {
  describe: "Title Of Note",
  demand: true,
  alias: "t"
};

const bodyOptions = {
  describe: "Body Of Note",
  demand: true,
  alias: "b"
};

const argv = yargs
  .command("add", "Add A New Note", {
    title: titleOptions,
    body: bodyOptions
  })
  .command("list", "List All Notes")
  .command("read", "Read A Note", {
    title: titleOptions
  })
  .command("delete", "Delete A Note", {
    title: titleOptions
  })
  .help().argv;
const command = argv._[0];

if (command === "add") {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log("NOTE ADDED !!!");
    notes.logNote(note);
  } else {
    console.log("NOTE NOT ADDED !!! NOTE WITH SAME TITLE ALREADY ESISTS !!!");
  }
} else if (command === "delete") {
  const newList = notes.deleteNote(argv.title);
  const message = newList ? "NOTE DELETED !!!" : "NOTE NOT FOUND !!!";
  console.log(message);
} else if (command === "read") {
  const note = notes.readNote(argv.title);
  if (note) {
    console.log("NOTE !!!");
    notes.logNote(note);
  } else {
    console.log("NOTE NOT FOUND !!!");
  }
} else if (command === "list") {
  const allNotes = notes.showList();
  console.log(`Printing ${allNotes.length} notes.`);
  allNotes.forEach(note => notes.logNote(note));
} else {
  console.log("Command Not Recognized !!!");
}
