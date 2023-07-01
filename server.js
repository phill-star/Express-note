const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

class App {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 6060;

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

  setupRoutes() {
    this.app.get('/notes', (req, res) =>
      res.sendFile(path.join(__dirname, '/public/notes.html'))
    );

    // Add the following route to handle the /api/notes endpoint
    this.app.use('/api/notes', api);

    this.app.get('/*', (req, res) =>
      res.sendFile(path.join(__dirname, '/public/index.html'))
    );
  }

  startServer() {
    this.app.listen(this.PORT, () =>
      console.log(`App listening at ${this.PORT}`)
    );
  }
}

const app = new App();
