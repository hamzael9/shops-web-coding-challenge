const express = require('express');
const router = express.Router();


const userController = require('./user.controller');

module.exports = (auth) => {
  router.post('/sign-up', userController.signUp);
  router.post('/sign-in', userController.signIn);

  router.get('/:id/preferred', auth, userController.getPreferred);
  router.post('/:id/preferred', auth, userController.addPreferred);
  router.delete('/:id/preferred', auth, userController.deletePreferred);

  return router;
};
