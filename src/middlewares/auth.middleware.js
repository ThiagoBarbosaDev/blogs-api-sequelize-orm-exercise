const { throwError } = require('../utils/errorHelpers');
const { verifyToken } = require('../utils/jwt.util');

const validateToken = (req, res, next) => {
  // const { authorization } = req.headers;
  const token = req.headers.authorization;
  if (!token) { throw throwError('TOKEN_NOT_FOUND', 'Token not found'); }
  const tokenData = verifyToken(token);
  req.token = tokenData;
  next();
};

module.exports = {
  validateToken,
};