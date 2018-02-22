
const express = require('express');
const router = express.Router();

const shopController = require('./shop.controller');

router.get('/nearby', shopController.getNearby);

module.exports = router;
