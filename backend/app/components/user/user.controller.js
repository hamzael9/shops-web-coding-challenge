const winston = require('winston');

const userService = require('./user.service');

exports.signUp = async (req, resp) => {
  let userObj = {};
  userObj.name = req.body.name;
  userObj.email = req.body.email;
  userObj.password = req.body.password;

  let res = await userService.add(userObj);
  if (res) {
    resp.status(200).json({msg: "Sign-Up successfull"});
  } else {
    resp.status(500).json();
  }

};

exports.signIn = (req, resp) => {
  resp.status(400).json('Login');
};

exports.getPreferred = (req, resp) => {
  let shops = [];
  resp.status(200).json(shops);
};

exports.addPreferred = (req, resp) => {
  resp.status(400).json('added shop to preferred shops');
};

exports.deletePreferred = (req, resp) => {
  resp.status(400).json('delete shop from preferred shops');
};
