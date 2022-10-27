const express = require('express');
const { postController } = require('../controllers');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.route('/search')
  .get(validateToken, postController.findByQuery);

router.route('/:id')
  .get(validateToken, postController.find)
  .put(validateToken, postController.update);

router.route('/')
  .get(validateToken, postController.findAll);

module.exports = router;