
const express = require('express');
const userController = require('../controllers/usercontroller');

const router = express.Router();

router.post('/', userController.addUser);
router.get('/', userController.helloWorld);

module.exports = router;
