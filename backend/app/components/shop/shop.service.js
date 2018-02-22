
const winston = require('winston');

const Shop = require('./shop.model');

const sortShops = (shops) => {
  return shops;
};

exports.getById = async (id) => {
  try {
    winston.debug(`Shop service getting by id ${id}`);
    return await Shop.findById(id);
  } catch (err) {
    winston.error(`Shop Service: Error getting shop by id ${id}`)
    winston.debug(err);
    return false;
  }
}

exports.getNearby = async (id) => {
  try {
    winston.debug('Shop service getting nearby shops');
    let shops = await Shop.find();
    // TODO: remove shops that are liked
    // TODO: remove shops that are disliked less than two hours
    return sortShops(shops);
  } catch (err) {
    winston.error('Shop service Error: could not get nearby shops');
    return false;
  }
};
