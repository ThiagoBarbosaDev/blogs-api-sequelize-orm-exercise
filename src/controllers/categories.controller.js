const { categoriesService } = require('../services');

const findAll = async (req, res) => {
  const response = await categoriesService.findAll();
  return res.status(200).json(response);
};

const insert = async (req, res) => {
  const categoryPayload = req.body;
  const response = await categoriesService.insert(categoryPayload);
  return res.status(201).json(response);
};

module.exports = {
  findAll,
  insert,
};