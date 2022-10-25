const { categoriesService } = require('../services');

const findAll = async (req, res) => {
  const response = await categoriesService.findAll();
  return res.status(200).json(response);
};

module.exports = {
  findAll,
};