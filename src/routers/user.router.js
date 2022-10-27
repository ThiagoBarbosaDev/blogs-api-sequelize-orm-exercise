const express = require('express');
const { userController } = require('../controllers');
const { validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

// router.route('/').get(userController.findAll);
router.route('/me')
  .delete(validateToken, userController.destroy);

router.route('/:id')
  .get(validateToken, userController.find);

router.route('/')
  .get(validateToken, userController.findAll)
  .post(userController.insert);

module.exports = router;