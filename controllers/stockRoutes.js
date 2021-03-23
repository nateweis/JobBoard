const express = require('express');
const router = express.Router();
const Stock = require("../models/stock");
const MiddleWare = require('../models/middleware');

router.post('/', MiddleWare.verifyToken, Stock.addItem);
router.get('/', MiddleWare.verifyToken, Stock.getItems);
router.get('/text', MiddleWare.verifyToken, Stock.getStockTextItem);
router.delete('/:id', MiddleWare.verifyToken, Stock.deleteItem);
router.put('/', MiddleWare.verifyToken, Stock.updateItem);
router.put('/text', MiddleWare.verifyToken, Stock.updateStockTextItem);

module.exports = router