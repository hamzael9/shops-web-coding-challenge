
const winston = require('winston');
const moment = require('moment');

const mongoose = require('mongoose');

const userService = require('../user/user.service');

const Shop = require('./shop.model');


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

exports.getNearby = async (id, longitude, latitude) => {
  try {
    winston.debug('Shop service getting nearby shops');
    // If coordinates are not specified just get the shops as they are from the DB
    let shops;
    if (longitude && latitude) {
      shops = await Shop.find({
        location: {
          $near: { $geometry: {type: "Point", coordinates: [longitude,latitude]} }
        }
      }).exec();
    } else {
      shops = await Shop.find();
    }

    // Get Special shops ( liked & disliked )
    let likedShops = await userService.getLikedShops(id);
    let dislikedShops = await userService.getDislikedShops(id);
    let specialShops = [...likedShops, ...dislikedShops];
    console.log(specialShops);
    // If Liked || if Disliked less than two hours don't show
    for (let i = 0 ; i < shops.length ; i++) {
      for (let sp of specialShops) {
        if (shops[i]._id.toString() === sp.shopId.toString()) {
          if (sp.likedTime) {
            shops.splice(i,1);
          } else if (sp.dislikedTime) {
            let duration = moment.duration(moment().diff(moment(sp.dislikedTime)));
            if (duration.asHours() < 2) {
              shops.splice(i,1);
            }
          }
        }
      }
    }
    return shops;
  } catch (err) {
    winston.error('Shop service Error: could not get nearby shops');
    winston.debug(err);
    return false;
  }
};
