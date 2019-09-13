const express = require('express');
const router = express.Router();
const Booster = require('../models/booster')
const MiddleWare = require('../models/middleware')

router.get('/', MiddleWare.verifyToken, Booster.indexScreen)

module.exports = router