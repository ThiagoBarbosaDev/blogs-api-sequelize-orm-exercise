const express = require('express');
const { categoriesController } = require('../controllers');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .post(validateToken, categoriesController.insert)
  .get(validateToken, categoriesController.findAll);

module.exports = router;