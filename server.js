const express = require("express");
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const { notes } = require("./db/db.json")

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

app.get("/api/notes", (req, res) => {
    let results = notes;
    if (req.query) {
    results = filterByQuery(req.query, results);
    }
    res.json(results);
});

app.post('/api/notes', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log("server running on port 3001!")
});