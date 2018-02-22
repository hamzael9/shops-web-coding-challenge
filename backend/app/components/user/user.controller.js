const winston = require('winston');

const passport = require('passport');

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
  winston.debug('Authenticating ...')
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      winston.error('Sign-in Controller Error');
      winston.debug(err);
      resp.status(500).json('Login Server Error');
    }
    if (!user) {
      winston.info(`User with provided credentials not authenticated ( ${user.email} )`);
      resp.status(401).json('Login not authorized');
    } else {
      winston.info(`User authenticated successfully ${user.email}`);
      const token = userService.generateToken(user);
      resp.status(200).json({
        _id: user._id,
        email: user.email,
        name: user.name,
        token: token
      });
    }
  })(req,resp);

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
