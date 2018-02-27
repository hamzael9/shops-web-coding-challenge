const winston = require('winston');

const shopService = require('./shop.service');

exports.getNearby = async (req, resp) => {
  winston.debug(`Getting nearby shops for user ${req.token.id}`);
  let longitude = req.query.x || null;
  let latitude = req.query.y || null;
  console.log(longitude, latitude);
  let shops = await shopService.getNearby(req.token.id, longitude, latitude);
  if (shops === false) {
    resp.status(500).json();
  } else {
    resp.status(200).json(shops);
  }
};
