
const winston = require('winston');
const moment = require('moment');

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
    let shops = await Shop.find({
      location: {
        $near: { $geometry: {type: "Point", coordinates: [-5,30]} }
      }
    }).exec();
    // TODO: remove shops that are liked
    let likedShops = await userService.getLikedShops(id);
    let dislikedShops = await userService.getDislikedShops(id);
    let specialShops = [...likedShops, ...dislikedShops];
    console.log(specialShops);
    // Check Liked and Disliked Shops
    for (let i = 0 ; i < shops.length ; i++) {
      for (let sp of specialShops) {
        if (shops[i]._id.toString() === sp.shopId.toString()) {
          if (sp.likedTime) {
            shops.splice(i,1);
          } else if (sp.dislikedTime) {
            // check time is less than two hours
            let duration = moment.duration(moment().diff(moment(sp.dislikedTime)));
            if (duration.asHours() < 2) {
              shops.splice(i,1);
            }
          }

        }
      }
    }
    // TODO: remove shops that are disliked less than two hours
    return sortShops(shops);
  } catch (err) {
    winston.error('Shop service Error: could not get nearby shops');
    winston.debug(err);
    return false;
  }
};
