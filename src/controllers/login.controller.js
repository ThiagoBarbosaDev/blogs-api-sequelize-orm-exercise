const { loginService } = require('../services');
const { createToken } = require('../utils/jwt.util');
const { loginSchema } = require('./validations/schemas');
const { validateUser } = require('./validations/validateUser');

const findAll = async (req, res) => {
  const response = await loginService.findAll();
  return res.status(200).json(response);
};

const auth = async (req, res) => {
  const loginData = req.body;
  const { email } = loginData;
  loginSchema.validate(loginData);
  await validateUser(loginData);
  const token = createToken({ email });
  return res.status(200).json({ token });
};

module.exports = {
  auth,
  findAll,
};