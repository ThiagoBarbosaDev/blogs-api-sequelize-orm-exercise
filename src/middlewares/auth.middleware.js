const { verifyToken } = require('../utils/jwt.util');

const validateToken = (req, res, next) => {
  const { authorization } = req.header;
  verifyToken(authorization);
  next();
};

module.exports = {
  validateToken,
};