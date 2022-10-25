const { User } = require('../../models');
const { throwError } = require('../../utils/errorHelpers');

const validateUser = async ({ email }) => {
  const result = await User.findAll({
    where: { email },
  });
  const userDoesNotExist = !result.length;
  if (userDoesNotExist) { throw throwError('USER_NOT_FOUND', 'Invalid fields'); }
};

module.exports = {
  validateUser,
};
