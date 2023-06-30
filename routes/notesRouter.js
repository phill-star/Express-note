const express = require('express');
const router = express.Router();
const fs = require('fs');
const { promisify } = require('util');
const uuid = require('../helpers/uuid');
const getDate = require('../helpers/getDate');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const dbFilePath = './db/db.json';

const readFromFile = async () => {
  try {
    const data = await readFile(dbFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading from file:', error);
    throw error;
  }
};

const writeToFile = async (data) => {
  try {
    await writeFile(dbFilePath, JSON.stringify(data, null, 4));
    console.info(`Data written to ${dbFilePath}`);
  } catch (error) {
    console.error('Error writing to file:', error);
    throw error;
  }
};

router.get('/', async (req, res) => {
  try {
    console.info(`${req.method} request received for notes`);
    const data = await readFromFile();
    res.json(data);
  } catch (error) {
    res.status(500).json('Internal server error');
  }
});

router.get('/:note_id', async (req, res) => {
  try {
    const noteId = req.params.note_id;
    console.info(`${req.method} request received for note ${noteId}.`);
    const data = await readFromFile();
    const note = data.find((note) => note.note_id === noteId);
    if (note) {
      res.json(note);
    } else {
      res.json('Note ID not found');
    }
  } catch (error) {
    res.status(500).json('Internal server error');
  }
});

router.delete('/:note_id', async (req, res) => {
  try {
    const noteId = req.params.note_id;
    console.info(`${req.method} request received for note id ${noteId}.`);
    const data = await readFromFile();
    const noteIndex = data.findIndex((note) => note.note_id === noteId);
    if (noteIndex !== -1) {
      const deletedNote = data.splice(noteIndex, 1)[0];
      await writeToFile(data);
      res.json(`${deletedNote.title} has been deleted`);
    } else {
      res.json('Note ID not found');
    }
  } catch (error) {
    res.status(500).json('Internal server error');
  }
});

router.post('/', async (req, res) => {
  try {
    console.info(`${req.method} request received to add a note.`);

    const { title, text } = req.body;

    if (title && text) {
      const newNote = {
        title,
        date: getDate(),
        text,
        note_id: uuid(),
      };
      const data = await readFromFile();
      data.push(newNote);
      await writeToFile(data);
      res.json(`Note added successfully. ID: ${newNote.note_id}`);
    } else {
      res.status(400).json('Error in adding note. Please provide both title and text.');
    }
  } catch (error) {
    res.status(500).json('Internal server error');
  }
});

module.exports = router;
