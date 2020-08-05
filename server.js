const express = require("express");
const app = express();
const { notes } = require("./db/db.json")

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
      filteredResults = filteredResults.filter(notes.note-title === query.title);
    }
    if (query.text) {
      filteredResults = filteredResults.filter(notes.text === query.text);
    }
    if (query.id) {
      filteredResults = filteredResults.filter(notes.id === query.id);
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

app.listen(3001, () => {
    console.log("server running on port 3001!")
});