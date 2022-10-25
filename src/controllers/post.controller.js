const { postService } = require('../services');

const findAll = async (req, res) => {
  const response = await postService.findAll();
  return res.status(200).json(response);
};

module.exports = {
  findAll,
};