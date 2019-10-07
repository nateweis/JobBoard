const express = require('express');
const router = express.Router();
const Booster = require('../models/booster')
const MiddleWare = require('../models/middleware')

router.get('/', MiddleWare.verifyToken, Booster.indexScreen)
router.get('/:id', MiddleWare.verifyToken, Booster.showScreen)
router.put('/',MiddleWare.verifyToken, Booster.updateJob)
router.put('/completed', MiddleWare.verifyToken, Booster.completeJob)
router.post('/', MiddleWare.verifyToken, Booster.newBoosterJob )
router.delete('/:id', MiddleWare.verifyToken, Booster.deleteJob)

module.exports = router