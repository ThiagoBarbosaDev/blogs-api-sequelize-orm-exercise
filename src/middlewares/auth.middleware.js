const { throwError } = require('../utils/errorHelpers');
const { verifyToken } = require('../utils/jwt.util');

const validateToken = (req, res, next) => {
  // const { authorization } = req.headers;
  const token = req.headers.authorization;
  console.log('VALIDATE', token);
  if (!token) { throw throwError('TOKEN_NOT_FOUND', 'Token not found'); }
  verifyToken(token);
  next();
};

module.exports = {
  validateToken,
};