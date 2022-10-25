const express = require('express');
const { loginController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(loginController.findAll)
  .post(loginController.auth);

module.exports = router;