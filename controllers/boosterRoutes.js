const express = require('express');
const router = express.Router();
const Booster = require('../models/booster')

router.get('/', Booster.indexScreen)

module.exports = router