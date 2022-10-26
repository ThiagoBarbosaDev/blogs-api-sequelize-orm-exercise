const express = require('express');
const { postController } = require('../controllers');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/:id')
  .get(validateToken, postController.find);

router.route('/')
  .get(validateToken, postController.findAll);

module.exports = router;