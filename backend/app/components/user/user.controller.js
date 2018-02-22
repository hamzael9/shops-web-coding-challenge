const winston = require('winston');

const passport = require('passport');

const userService = require('./user.service');
const shopService = require('../shop/shop.service');

exports.signUpHandler = async (req, resp) => {
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

exports.signInHandler = (req, resp) => {
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


exports.getLikedHandler = async (req, resp) => {
  winston.debug(`Getting Liked Shops for user ${req.token.email}`);
  let shops = await userService.getLikedShops(req.token.id);
  if (shops === false) {
    resp.status(500).json('Error');
  } else {
    resp.status(200).json(shops);
  }
};

exports.addToLikedHandler = async (req, resp) => {
  let idShop = req.params.id;
  let idUser = req.token.id;
  winston.debug(`Adding shop ${idShop} to Liked list of user ${idUser}`);

  let shop = await shopService.getById(idShop);
  if (shop === false || shop === null) {
    resp.status(500).json();
  }
  if (await userService.likeShop(idUser, shop) ) {
    resp.status(200).json();
  } else {
    resp.status(500).json();
  }

};


exports.removeFromLikedHandler = async (req, resp) => {
  let idShop = req.params.id;
  let idUser = req.token.id;
  winston.debug(`Removing shop ${idShop} from liked list of user ${idUser}`);

  let shop = await shopService.getById(idShop);
  if (shop === false || shop === null) {
    resp.status(500).json();
  }
  if (await userService.unlikeShop(idUser, shop) ) {
    resp.status(200).json();
  } else {
    resp.status(500).json();
  }

};

exports.addToDislikedHandler = async (req, resp) => {

  let idShop = req.params.id;
  let idUser = req.token.id;
  winston.debug(`Adding shop ${idShop} to Disliked list of user ${idUser}`);

  let shop = await shopService.getById(idShop);
  if (shop === false || shop === null) {
    resp.status(500).json();
  }
  if (await userService.dislikeShop(idUser, shop) ) {
    resp.status(200).json();
  } else {
    resp.status(500).json();
  }

};


exports.removeFromDislikedHandler = async (req, resp) => {
  let idShop = req.params.id;
  let idUser = req.token.id;
  winston.debug(`Removing shop ${idShop} from disliked list of user ${idUser}`);

  let shop = await shopService.getById(idShop);
  if (shop === false || shop === null) {
    resp.status(500).json();
  }
  if (await userService.undislikeShop(idUser, shop) ) {
    resp.status(200).json();
  } else {
    resp.status(500).json();
  }
};
