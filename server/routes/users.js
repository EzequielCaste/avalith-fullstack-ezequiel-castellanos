const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const userController = require('../controllers/users.controller');

// /users Routes

// register user
router.post('/register', [
  check('email').not().isEmpty().isEmail().withMessage('Email is not valid'),
  check('password').isLength({min: 3}).withMessage('Password must be at least 3 characters'),
  check('admin').isBoolean({loose: false}).withMessage('Admin role should not be empty'),
  userController.register,
]);

router.post('/login', [
  check('email').not().isEmpty().isEmail().withMessage('Email is not valid'),
  check('password').isLength({min: 3}).withMessage('Password must be at least 3 characters'),
  userController.login,
]);
module.exports = router;
