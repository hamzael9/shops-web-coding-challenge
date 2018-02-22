const express = require('express');
const router = express.Router();

const userController = require('./user.controller');


router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

router.get('/:id/preferred', userController.getPreferred);
router.post('/:id/preferred', userController.addPreferred);
router.delete('/:id/preferred', userController.deletePreferred);


module.exports = router;
