const winston = require('winston');

const User = require('./user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = require('../../config/web')[process.env.NODE_ENV || 'dev']["JWT_SECRET"];

exports.generateToken = (userObj) => {
  return jwt.sign({
    id: userObj.id,
    name: userObj.name,
    email: userObj.email
  }, JWT_SECRET, {expiresIn: 3600});
};

exports.add = async (userObj) => {
  let user = new User();
  user.name = userObj.name;
  user.email = userObj.email;
  user.password = bcrypt.hashSync(userObj.password, 10);

  try {
    await user.save();
    return true;
  } catch (err) {
    winston.error('UserService: Error adding user');
    return false;
  }
};


exports.getLikedShops = async (id) => {
  try {
    let user = await User.findById(id);
    return user.likedShops;
  } catch (err) {
    winston.error(`User Service: Error getting liked shops for user with ID ${id}` );
    return null ;
  }
};

exports.getDislikedShops = async (id) => {
  try {
    let user = await User.findById(id);
    return user.dislikedShops;
  } catch (err) {
    winston.error(`User Service: Error getting disliked shops for user with ID ${id}` );
    return null ;
  }
};

exports.likeShop = async (idUser, shop) => {
  winston.debug(`User Service : Liking shop ${shop.name} by user ${idUser}`);
  let now = (new Date()).toISOString();
  try {
    let user = await User.findById(idUser);
    console.log(user.email);
    // check if the shop is already in the array, if yes update only the time.
    let updated = false;
    for (let el of user.likedShops) {
      if (el.shopId.equals(shop._id)) {
        el.likedTime = now;
        updated = true;
        break;
      }
    }
    if (!updated) {
      user.likedShops.push({shopId: shop._id, likedTime: now});
    }
    await user.save();
    return true;
  } catch (err) {
    winston.error(`User Service: Error in liking shop ${idShop} by user ${idUser}`);
    winston.debug(err);
    return false;
  }
};

exports.unlikeShop = async (idUser, shop) => {
  winston.debug(`User Service : Un-liking shop ${shop.name} by user ${idUser}`);

  try {
    let user = await User.findById(idUser);
    // check if the shop is already in the array, if yes update only the time.
    for (let [index, el] of user.likedShops.entries()) {
      if (el.shopId.equals(shop._id)) {
        winston.debug('Found Shop to be removed !');
        user.likedShops.splice(index,1);
        break;
      }
    }
    await user.save();
    return true;
  } catch (err) {
    winston.error(`User Service: Error in un-liking shop ${idShop} by user ${idUser}`);
    winston.debug(err);
    return false;
  }
};

exports.dislikeShop = async (idUser, shop) => {
  winston.debug(`User Service : Disliking shop ${shop.name} by user ${idUser}`);
  let now = (new Date()).toISOString();
  try {
    let user = await User.findById(idUser);
    // check if the shop is already in the array, if yes update only the time.
    let updated = false;
    for (let el of user.dislikedShops) {
      if (el.shopId.equals(shop._id)) {
        el.dislikedTime = now;
        updated = true;
        break;
      }
    }
    if (!updated) {
      user.dislikedShops.push({shopId: shop._id, likedTime: now});
    }
    await user.save();
    return true;
  } catch (err) {
    winston.error(`User Service: Error in disliking shop ${idShop} by user ${idUser}`);
    winston.debug(err);
    return false;
  }
};

exports.undislikeShop = async (idUser, shop) => {
  winston.debug(`User Service : Un-disliking shop ${shop.name} by user ${idUser}`);

  try {
    let user = await User.findById(idUser);
    // check if the shop is already in the array, if yes update only the time.
    for (let [index, el] of user.dislikedShops.entries()) {
      if (el.shopId.equals(shop._id)) {
        winston.debug('Found Shop to be removed !');
        user.dislikedShops.splice(index,1);
        break;
      }
    }
    await user.save();
    return true;
  } catch (err) {
    winston.error(`User Service: Error in un-disliking shop ${idShop} by user ${idUser}`);
    winston.debug(err);
    return false;
  }
};
