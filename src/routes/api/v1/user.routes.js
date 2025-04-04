const express = require('express');
const router = express.Router();
const { UserController } = require('../../../controllers');
const { UserMiddleware } = require('../../../middlewares');

router.post('/signup', UserMiddleware.validateSignUp, UserController.signUp);

module.exports = router;
