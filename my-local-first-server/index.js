// my-local-first-server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let notes = [];

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.post('/notes', (req, res) => {
  const note = req.body;
  notes.push(note);
  res.status(201).json(note);
});

app.put('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const note = req.body;
  const index = notes.findIndex(n => n.id === id);
  if (index !== -1) {
    notes[index] = note;
    res.json(note);
  } else {
    res.status(404).send('Note not found');
  }
});

app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).send();
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
