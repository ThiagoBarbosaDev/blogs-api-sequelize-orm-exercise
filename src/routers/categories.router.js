const express = require('express');
const { categoriesController } = require('../controllers');

const router = express.Router();

router.route('/')
  .get(categoriesController.findAll);

module.exports = router;