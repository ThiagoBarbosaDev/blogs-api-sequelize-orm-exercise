const { userPostSchema } = require('../controllers/validations/schemas');
const { validateUserAlreadyRegistered } = require('../controllers/validations/validateUser');
const { User } = require('../models');
const { createToken } = require('../utils/jwt.util');

const findAll = async () => {
  // const result = await User.findAll({
  //   where: { id: 1 },
  //   include: [{ model: Post, as: 'post' }],
  // });
  const result = await User.findAll();

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
  findAll,
  insert,
};