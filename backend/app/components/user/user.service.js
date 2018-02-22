
const winston = require('winston');

const User = require('./user.model');

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
