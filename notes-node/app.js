const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');


const titleOptions = {
  describe: 'Title of Note',
  demand: true,
  alias: 't'
};
const bodyOptions = {
  describe: 'Message Body',
  demand: true,
  alias: 'b'
};
const argv = yargs.
  command('add','Add A New Note', {
    title: titleOptions,
    body: bodyOptions
  })
  .command('list', 'List All Notes')
  .command('read', 'Read a Note', {
    title: titleOptions
  })
  .command('remove', 'Remove a Note', {
    title: titleOptions
  })
  .help()
  .argv
const command = argv._[0];

if (command === 'add') {
  const note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Added New Note');
    notes.logNote(note);
  } else {
    console.log(`Duplicate Title(${argv.title})!`);
  }
} else if (command === 'list') {
  const allNotes = notes.getAll();
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  const note = notes.getNote(argv.title);
  if (note) {
    console.log('ReadNote');
    notes.logNote(note);
  } else {
    console.log(`Note,${argv.title}, not found!`);
  }
} else if (command === 'remove') {
  if (notes.removeNote(argv.title)) {
    console.log(`Removed note, ${argv.title}, successfully`);
  } else {
    console.log(`Note does not exist.`);
  }

} else {
  console.log('Command Not Recognized');
}
