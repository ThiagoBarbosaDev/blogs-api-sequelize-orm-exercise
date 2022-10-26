require('dotenv').config();
const jwt = require('jsonwebtoken');
const { throwError } = require('./errorHelpers');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: '30d',
      algorithm: 'HS256',
    });
    return data;
  } catch (error) {
    throw throwError('INVALID_TOKEN', 'Expired or invalid token');
  }
};

module.exports = {
  createToken,
  verifyToken,
};