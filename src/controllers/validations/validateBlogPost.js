const { BlogPost, User } = require('../../models');
// const teste = require('../../services/post.service');
const { throwError } = require('../../utils/errorHelpers');

const validatePost = async (id) => {
  const result = await BlogPost.findAll({
    where: { id },
  });
  const postDoesNotExist = !result.length;
  if (postDoesNotExist) { throw throwError('POST_NOT_FOUND', 'Post does not exist'); }
};

const validatePostAuthorization = async (id, tokenEmail) => {
  const [{ dataValues: { user: { dataValues: { email } } } }] = await BlogPost.findAll({
    where: { id },
  include: [
    { 
      model: User, 
      as: 'user', 
      attributes: { exclude: ['password'] },
    },
  ],
});
  const postDoesNotBelongToUser = tokenEmail !== email;
  console.log(postDoesNotBelongToUser);
  if (postDoesNotBelongToUser) { throw throwError('UNAUTHORIZED_USER', 'Unauthorized user'); }
};
// const validatePostAuthorization = async (id, tokenEmail) => {
//   const { dataValues: { user: { dataValues: { email } } } } = await find(id);
//   const postDoesNotBelongToUser = tokenEmail !== email;
//   if (postDoesNotBelongToUser) { throw throwError('UNAUTHORIZED_USER', 'Unauthorized user'); }
// };

module.exports = {
  validatePost,
  validatePostAuthorization,
};
