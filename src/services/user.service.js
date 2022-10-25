const { User, Post } = require('../models');

const findAll = async () => {
  // const result = await User.findAll({
  //   where: { id: 1 },
  //   include: [{ model: Post, as: 'post' }],
  // });
  const result = await User.findAll();

  return { type: null, message: 'USER-SERVICE', result };
};

const insert = async () => {
  const result = await User.findAll();
  return { type: null, message: 'USER-SERVICE', result };
};

module.exports = {
  findAll,
  insert,
};