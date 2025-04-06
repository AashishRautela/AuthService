const express = require('express');
const router = express.Router();
const { UserController } = require('../../../controllers');
const { UserMiddleware } = require('../../../middlewares');

router.post('/signup', UserMiddleware.validateSignUp, UserController.signUp);
router.post('/signin', UserMiddleware.validateSignIn, UserController.signIn);
router.get('/isAuthenticated', UserController.isAuthenticated);
router.get('/:id', UserController.getUserDetails);
router.get('/isadmin/:id', UserController.isAdmin);

module.exports = router;
