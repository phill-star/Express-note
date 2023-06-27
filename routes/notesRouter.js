const express = require('express');
const fs = require('fs');
const uuid = require('uuid');
const getDate = require('../routes/getDate.js');
const notes = require('../db/db.json');

const router = express.Router();

router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });

  router.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    if (req.body && noteId) {
      console.info(`${req.method} request received for note ${noteId}.`);
      const foundNote = notes.find((note) => note.note_id === noteId);
      if (foundNote) {
        res.json(foundNote);
      } else {
        res.json('Note ID not found');
      }
    }
  });
  
  router.delete('/:note_id', (req, res, next) => {
    const noteId = req.params.note_id;
    console.info(`${req.method} request received for note id ${noteId}.`);
    for (let i = 0; i < notes.length; i++) {
      const currentNote = notes[i];
      if (currentNote.note_id === noteId) {
        res.json(`${currentNote.title} has been deleted`);
        notes.splice(i, 1);
        console.log(notes);
        readAndOverwrite(notes, './db/db.json');
        return;
      }
    }
  });
  router.post('/', (req, res) => {
    console.info(`${req.method} request received to add a note.`);
    const { title, text } = req.body;

    if (req.body) {
      const newNote = {
        title,
        date: getDate(),
        text,
        note_id: uuid(),
      };
      notes.push(newNote);
      fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          res.status(500).json('Internal server error');
        } else {
          res.json(`Note added successfully. ID: ${newNote.note_id}`);
        }
      });
    } else {
      res.status(400).json('Error in adding note. Please try again.');
    }
  });
  
  module.exports = router;