const express = require('express');
const router = express.Router();
const Stock = require("../models/stock")
const MiddleWare = require('../models/middleware')

router.post('/', MiddleWare.verifyToken, Stock.addItem)

module.exports = router