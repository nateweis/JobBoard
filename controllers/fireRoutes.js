const express = require('express');
const router = express.Router();
const Fire= require('../models/fire')
const MiddleWare = require('../models/middleware')

router.get('/', MiddleWare.verifyToken, Fire.indexScreen)
router.get('/:id', MiddleWare.verifyToken, Fire.showScreen)
router.put('/',MiddleWare.verifyToken, Fire.updateJob)
router.put('/completed', MiddleWare.verifyToken, Fire.completeJob)
router.post('/', MiddleWare.verifyToken, Fire.newFireJob )
router.delete('/:id', MiddleWare.verifyToken, Fire.deleteJob)

module.exports = router