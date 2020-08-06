const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const { notes } = require("./db/db.json")
app.use(express.static('public'));

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(notes => notes.note-title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(notes => notes.text === query.text);
    }
    if (query.id) {
      filteredResults = filteredResults.filter(notes => notes.id === query.id);
    }
    return filteredResults;
}

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  return note;
}

app.get("/api/notes", (req, res) => {
    let results = notes;
    if (req.query) {
    results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();
  console.log(req.body);

  // add note to json file and animals array in this function
  const note = createNewNote(req.body, notes);

  res.json(req.body);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("server running on port 3001!")
});