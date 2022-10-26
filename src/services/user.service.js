const { userPostSchema } = require('../controllers/validations/schemas');
const { validateUserAlreadyRegistered } = require('../controllers/validations/validateUser');
const { User, Post } = require('../models');
const { createToken } = require('../utils/jwt.util');

const findAll = async () => {
  const result = await User.findAll();
  const dataWithoutPassword = result.map((data) => {
    const { password, ...rest } = data.dataValues;
    return rest;
  });
  return dataWithoutPassword;
};

const find = async () => {
  const result = await User.findAll({
    where: { id: 1 },
    include: [{ model: Post, as: 'post' }],
  });
  return { type: null, message: 'USER-SERVICE', result };
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