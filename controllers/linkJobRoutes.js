const express = require('express');
const router = express.Router();
const Link = require('../models/jobLinks');
const MiddleWare = require('../models/middleware');

router.get('/', MiddleWare.verifyToken, Link.retriveLinkJobs);
router.post('/', MiddleWare.verifyToken, Link.newLinkJob);
router.put('/', MiddleWare.verifyToken, Link.addToLinkJobs);

module.exports = router;