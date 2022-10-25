const { Post, User } = require('../models');

const findAll = async () => {
  const result = await Post.findAll({
    where: { userId: 1 },
    include: [{ model: User, as: 'author' }],
  });
  return { type: null, message: 'POST-SERVICE', result };
};

module.exports = {
  findAll,
};