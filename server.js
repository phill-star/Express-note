const express = require('express');
const app = express();
const path = require('path');
const api = require('./routes/index.js');

const PORT = (process.env.PORT || 8080);

