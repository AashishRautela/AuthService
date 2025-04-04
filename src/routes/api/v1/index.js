const express = require('express');
const router = express.Router();
const UserRoutes = require('./user.routes.js');

router.use('/user', UserRoutes);

module.exports = router;
