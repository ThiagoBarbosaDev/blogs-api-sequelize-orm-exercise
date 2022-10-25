const express = require('express');
const { postController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(postController.findAll);

module.exports = router;