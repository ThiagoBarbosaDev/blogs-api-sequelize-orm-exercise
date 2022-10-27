const { postPutSchema } = require('../controllers/validations/schemas');
const { validatePost,
  validatePostAuthorization } = require('../controllers/validations/validateBlogPost');
const { BlogPost, User, Category, Sequelize } = require('../models');

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

const update = async (id, payload, tokenEmail) => {
  const { title, content } = payload;
  const sanitizedPayload = { title, content };
  postPutSchema.validate(sanitizedPayload);
  await validatePostAuthorization(id, tokenEmail);
  await BlogPost.update({ ...sanitizedPayload }, {
    where: {
      id,
    },
  });
  const response = await find(id);
  return response;
};

// {
//   "title": "Latest updates, August 1st",
//   "content": "The whole text for the blog post goes here in this key"
// }

const findByQuery = async ({ q: query }) => BlogPost.findAll(
    { 
      where: { 
        [Sequelize.Op.or]: 
          [{ title: { [Sequelize.Op.like]: `%${query}%` } }, 
          { content: { [Sequelize.Op.like]: `%${query}%` } }] },
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
     }, 
  );

module.exports = {
  findAll,
  find,
  update,
  findByQuery,
};