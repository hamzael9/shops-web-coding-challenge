const winston = require('winston');

const User = require('./user.model');

const jwt = require('jsonwebtoken');

const JWT_SECRET = require('../../config/web')[process.env.NODE_ENV || 'dev']["JWT_SECRET"];


exports.add = async (userObj) => {
  let user = new User();
  user.name = userObj.name;
  user.email = userObj.email;
  user.password = userObj.password;

  try {
    await user.save();
    return true;
  } catch (err) {
    winston.error('UserService: Error adding user');
    return false;
  }
};

exports.generateToken = (userObj) => {
  return jwt.sign({
    id: userObj.id,
    name: userObj.name,
    email: userObj.email
  }, JWT_SECRET, {expiresIn: 3600});
}
