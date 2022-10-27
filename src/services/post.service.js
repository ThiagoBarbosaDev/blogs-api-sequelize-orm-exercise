const { postPutSchema } = require('../controllers/validations/schemas');
const { validatePost,
  validatePostAuthorization } = require('../controllers/validations/validateBlogPost');
const { BlogPost, User, Category, Sequelize, PostCategory } = require('../models');
const { throwError } = require('../utils/errorHelpers');

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

  const destroy = async (id, tokenEmail) => {
    await validatePost(id);
    await validatePostAuthorization(id, tokenEmail);
    await BlogPost.destroy({ where: { id } });
  };

  const validateCategory = async (id) => { 
    const result = await Category.findAll({ where: { id } });
    if (!result.length) { 
      throw throwError('FIELD_NOT_FOUND', 'one or more "categoryIds" not found'); 
    }
  };

  const findIdByEmail = async (email) => User.findAll({ where: { email } });

  const createPost = async (postPayload, userId) => {
    const result = await BlogPost.create({ 
      ...postPayload,
      userId,
      updated: Date.now(), 
      published: Date.now(),
    });
    return result;
  };

  const insert = async (postPayload, { email }) => {
    const { categoryIds, ...rest } = postPayload;
    postPutSchema.validate(rest);
    const [{ dataValues: { id: userId } }] = await findIdByEmail(email);
    const result = await createPost(rest, userId);
    const { dataValues: { id: postId } } = result;
    await Promise
      .all(categoryIds.map(async (categoryId) => { 
        await validateCategory(categoryId);
        await PostCategory.create({ categoryId, postId });
      }));
    return result;
  };

module.exports = {
  findAll,
  find,
  update,
  findByQuery,
  destroy,
  insert,
};