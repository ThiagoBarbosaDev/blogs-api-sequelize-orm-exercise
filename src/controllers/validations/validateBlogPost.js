const { BlogPost } = require('../../models');
const { throwError } = require('../../utils/errorHelpers');

const validatePost = async (id) => {
  console.log('entrei');
  const result = await BlogPost.findAll({
    where: { id },
  });
  const postDoesNotExist = !result.length;
  if (postDoesNotExist) { throw throwError('POST_NOT_FOUND', 'Post does not exist'); }
};

module.exports = {
  validatePost,
};
