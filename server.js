const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

class App {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 8080;

    this.setupMiddleware();
    this.setupRoutes();
    this.startServer();
  }

  setupMiddleware() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use('/api', api);
    this.app.use(express.static('public'));
  }

}