const express = require('express');
const router = express.Router();


const userController = require('./user.controller');

module.exports = (auth) => {
  router.post('/sign-up', userController.signUpHandler);
  router.post('/sign-in', userController.signInHandler);

  router.get('/shops/liked', auth, userController.getLikedHandler);

  router.post('/shops/liked/:id', auth, userController.addToLikedHandler);
  router.delete('/shops/liked/:id', auth, userController.removeFromLikedHandler);
  router.post('/shops/disliked/:id', auth, userController.addToDislikedHandler);
  router.delete('/shops/disliked/:id', auth, userController.removeFromDislikedHandler);

  return router;
};
