require('dotenv').config();
const jwt = require('jsonwebtoken');

const createToken = (data) => {
  const token = jwt.sign({ data }, process.env.JWT_SECRET, {
    expiresIn: '30d',
    algorithm: 'HS256',
  });

  return token;
};

const verifyToken = (token) => {
  try {
    const { data } = jwt.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (_erro) {
    throw new Error('invalid token');
  }
};

module.exports = {
  createToken,
  verifyToken,
};