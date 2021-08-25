const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const userController = require('../controllers/users.controller');

// register user
router.post('/', [
  check('email').not().isEmpty().isEmail().withMessage('Email is not valid'),
  check('password').isLength({min: 3}).withMessage('Password must be at least 3 characters'),
  userController.register,
]);

module.exports = router;
