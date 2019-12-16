const express = require('express');
const router = express.Router();
const User = require('../models/user.js')
const MiddleWare = require('../models/middleware')

router.post('/', User.login);
router.post('/newUser', MiddleWare.verifyToken, User.makeANewUser);
router.put('/', MiddleWare.verifyToken, User.updatePassword);
router.get('/', MiddleWare.verifyToken, User.getUsers);
router.delete('/:id', MiddleWare.verifyToken, User.deleteUser);

module.exports = router