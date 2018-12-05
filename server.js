const express = require('express');
const path = require('path');
const next = require('next');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const models = require('./lib/models');
const router = require('./lib/router');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const db = config.mongodb;
mongoose.Promise = global.Promise;
if (db.authSource) {
  mongoose.connect(`mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}?authSource=${db.authSource}`, { useNewUrlParser: true });
} else {
  mongoose.connect(`mongodb://${db.host}:${db.port}/${db.database}`, { useNewUrlParser: true });
}

app.prepare()
  .then(() => {
    const server = express();

    server.use(bodyParser.urlencoded({extended: true}));
    server.use(bodyParser.json());

    server.use('/favicon.ico', express.static(
      path.join(__dirname, 'static/favicon.ico')
    ));
    server.use('/favicon.svg', express.static(
      path.join(__dirname, 'static/favicon.svg')
    ));
    server.use('/favicon.png', express.static(
      path.join(__dirname, 'static/favicon.png')
    ));

    server.use('/api', router);

    server.get('/ss/:id', (req, res) => {
      const actualPage = '/secret-santa';
      const queryParams = { secretSantaGroupId: req.params.id } ;
      app.render(req, res, actualPage, queryParams);
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(config.port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${config.port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
