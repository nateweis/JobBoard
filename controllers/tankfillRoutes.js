const express = require('express');
const router = express.Router();
const Tankfill = require('../models/tankfill')
const MiddleWare = require('../models/middleware')

router.get('/', MiddleWare.verifyToken, Tankfill.indexScreen)
router.get('/:id', MiddleWare.verifyToken, Tankfill.showScreen)
router.put('/',MiddleWare.verifyToken, Tankfill.updateJob)
router.put('/completed', MiddleWare.verifyToken, Tankfill.completeJob)
router.post('/', MiddleWare.verifyToken, Tankfill.newTankfillJob )
router.delete('/:id', MiddleWare.verifyToken, Tankfill.deleteJob)

module.exports = router