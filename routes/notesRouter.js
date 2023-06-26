const express = require('express');
const fs = require('fs');
const uuid = require('../helpers/uuid');
const getDate = require('../helpers/getDate');
const notes = require('../db/db.json');

const router = express.Router();
