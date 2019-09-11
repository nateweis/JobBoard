const express = require('express');
const router = express.Router();
const User = require('../models/user.js')

router.get('/', User.login);

module.exports = router