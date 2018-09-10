const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const addNote = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };
  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
  return null;
};

const getAll = () => {
  return fetchNotes();
};

const getNote = (title) => {
  return fetchNotes().find((note) => note.title === title);
};

const logNote = (note) => {
  console.log(JSON.stringify(note));
}

const removeNote = (title) => {
  const notes = fetchNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  saveNotes(notesToKeep);
  return notes.length !== notesToKeep.length;
};

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
