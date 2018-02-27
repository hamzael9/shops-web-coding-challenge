
const winston = require('winston');

const mongoose = require('mongoose');

const userService = require('../user/user.service');

const Shop = require('./shop.model');

const sortShops = (shops) => {
  // TODO: Sort shops
  return shops;
};

exports.getById = async (id) => {
  try {
    winston.debug(`Shop service getting by id ${id}`);
    return await Shop.findById(id);
  } catch (err) {
    winston.error(`Shop Service: Error getting shop by id ${id}`);
    winston.debug(err);
    return false;
  }
}

exports.getNearby = async (id) => {
  try {
    winston.debug('Shop service getting nearby shops');
    let shops = await Shop.find();
    // TODO: remove shops that are liked
    let likedShops = await userService.getLikedShops(id);
    console.log(likedShops);
    for (let i = 0 ; i < shops.length ; i++) {
      for (let ls of likedShops) {
        //console.log(shops[i]._id);
        //console.log(ls.shopId);
        if (shops[i]._id.toString() === ls.shopId.toString()) {
          console.log('slicing !');
          shops.splice(i,1);
        }
      }
    }
    // TODO: remove shops that are disliked less than two hours
    return sortShops(shops);
  } catch (err) {
    winston.error('Shop service Error: could not get nearby shops');
    return false;
  }
};
