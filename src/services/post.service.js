const { validatePost } = require('../controllers/validations/validateBlogPost');
const { BlogPost, User, Category } = require('../models');

const find = async (id) => {
  await validatePost(id);
  const [result] = await BlogPost.findAll({
      where: { id },
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

const findAll = async () => {
  const result = await BlogPost.findAll({
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
  find,
};