const express = require('express');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const getDate = require('../helpers/getDate');
const notes = require('../db/db.json');

const router = express.Router();

router.get('/', (req, res) => {
    console.info(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
  });
