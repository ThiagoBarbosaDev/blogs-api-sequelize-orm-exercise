const express = require('express');
const { userController } = require('../controllers');

const router = express.Router();

// router.route('/').get(userController.findAll);
router.route('/').get(userController.findAll)
  .post(userController.insert);

module.exports = router;