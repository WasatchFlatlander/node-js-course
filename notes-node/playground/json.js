// const obj = {
//   name: 'Josh'
// };
//
// const stringObj = JSON.stringify(obj);
// console.log(typeof(obj));
// console.log(stringObj);

// const personString = '{"name": "Josh", "age": 25}';
// const personObj = JSON.parse(personString);
// console.log(typeof(personObj));
// console.log(JSON.stringify(personObj));


const fs = require('fs');
const originalNote = {
  title: 'Some title',
  body: 'Some body'
}
const originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);
const noteString = fs.readFileSync('notes.json');
const note = JSON.parse(noteString);
console.log(typeof note);
console.log(`Note Title: ${note.title}. Note Body: ${note.body}.`);
