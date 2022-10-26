const { BlogPost, User, PostCategory, Category } = require('../models');

// const result = await Post.findAll({
//   where: { userId: 1 },
//   include: [{ model: User, as: 'author' }],
// });

const findAll = async () => {
  const result = await BlogPost.findAll({
    where: { userId: 1 },
    include: [
      { 
        model: User, 
        as: 'user', 
        attributes: { exclude: ['password'] },
      },
      { 
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return result;
};

module.exports = {
  findAll,
};