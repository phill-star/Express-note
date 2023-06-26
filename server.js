const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

class App {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;
  }}
  // Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
app.use(express.static('public'));
