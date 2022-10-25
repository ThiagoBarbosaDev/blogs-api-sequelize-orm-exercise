const { User } = require('../../models');
const { throwError } = require('../../utils/errorHelpers');

const validateUser = async ({ email }) => {
  const result = await User.findAll({
    where: { email },
  });
  const userDoesNotExist = !result.length;
  if (userDoesNotExist) { throw throwError('USER_NOT_FOUND', 'Invalid fields'); }
};

const validateUserAlreadyRegistered = async ({ email }) => {
  const result = await User.findAll({
    where: { email },
  });
  const userAlreadyExists = result.length;
  console.log(result, email, userAlreadyExists);
  if (userAlreadyExists) { throw throwError('USER_ALREADY_EXISTS', 'User already registered'); }
};

module.exports = {
  validateUser,
  validateUserAlreadyRegistered,
};
