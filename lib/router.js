const router = require('express').Router();
const secretSantaController = require('./controllers/secretSanta.js');

router
  .get('/secret-santa/:id', secretSantaController.getSecretSanta)
  .post('/secret-santa', secretSantaController.postSecretSanta)
  .put('/secret-santa/:id', secretSantaController.putSecretSanta);

module.exports = router;
