
const express = require('express');
const router = express.Router();

const shopController = require('./shop.controller');

module.exports = (auth) => {
  router.get('/nearby', auth, shopController.getNearby);
  return router;
}
