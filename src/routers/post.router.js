const express = require('express');
const { postController } = require('../controllers');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/')
  .get(validateToken, postController.findAll);

module.exports = router;