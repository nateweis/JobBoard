const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const MiddleWare = require('../models/middleware')

router.post('/', User.login);
router.put('/', MiddleWare.verifyToken, User.updatePassword);

module.exports = router