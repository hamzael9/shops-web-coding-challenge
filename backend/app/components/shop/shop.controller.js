const winston = require('winston');

const shopService = require('./shop.service');

exports.getNearby = async (req, resp) => {
  winston.debug(`Getting nearby shops for user ${req.token.id}`);
  let shops = await shopService.getNearby(req.token.id);
  if (shops === false) {
    resp.status(500).json();
  } else {
    resp.status(200).json(shops);
  }
};
