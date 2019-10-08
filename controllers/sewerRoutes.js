const express = require('express');
const router = express.Router();
const Sewer = require('../models/sewer')
const MiddleWare = require('../models/middleware')

router.get('/', MiddleWare.verifyToken, Sewer.indexScreen)
router.get('/:id', MiddleWare.verifyToken, Sewer.showScreen)
router.put('/',MiddleWare.verifyToken, Sewer.updateJob)
router.put('/completed', MiddleWare.verifyToken, Sewer.completeJob)
router.post('/', MiddleWare.verifyToken, Sewer.newSewerJob )
router.delete('/:id', MiddleWare.verifyToken, Sewer.deleteJob)

module.exports = router