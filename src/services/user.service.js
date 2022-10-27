const { userPostSchema } = require('../controllers/validations/schemas');
const { validateUserAlreadyRegistered } = require('../controllers/validations/validateUser');
const { User } = require('../models');
const { throwError } = require('../utils/errorHelpers');
const { createToken } = require('../utils/jwt.util');

const findAll = async () => {
  const result = await User.findAll();
  const dataWithoutPassword = result.map((data) => {
    const { password, ...rest } = data.dataValues;
    return rest;
  });
  return dataWithoutPassword;
};

const find = async (id) => {
  const result = await User.findAll({
    where: { id },
  });
  if (!result.length) { throw throwError('USER_NOT_FOUND', 'User does not exist'); }
  const { dataValues: { password, ...dataWithoutPassword } } = result[0];
  return dataWithoutPassword;
};

const insert = async (userPayload) => {
  userPostSchema.validate(userPayload);
  await validateUserAlreadyRegistered(userPayload);
  await User.create({ ...userPayload });
  const { password, ...userDataWithoutPassword } = userPayload;
  const token = createToken(userDataWithoutPassword);
  return { token };
};

module.exports = {
  find,
  findAll,
  insert,
};