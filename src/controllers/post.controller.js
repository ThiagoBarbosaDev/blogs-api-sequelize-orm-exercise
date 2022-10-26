const { postService } = require('../services');

const findAll = async (req, res) => {
  const response = await postService.findAll();
  return res.status(200).json(response);
};

const find = async (req, res) => {
  const { id } = req.params;
  const response = await postService.find(id);
  return res.status(200).json(response);
};

module.exports = {
  findAll,
  find,
};