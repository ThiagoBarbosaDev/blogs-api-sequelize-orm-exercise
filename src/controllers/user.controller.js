const { userService } = require('../services');

const findAll = async (req, res) => {
  const response = await userService.findAll();
  return res.status(200).json(response);
};

const find = async (req, res) => {
  const { id } = req.params;
  const response = await userService.find(id);
  return res.status(200).json(response);
};

const insert = async (req, res) => {
  const userPayload = req.body;
  const response = await userService.insert(userPayload);
  return res.status(201).json(response);
};

const destroy = async (req, res) => {
const { token } = req;
await userService.destroy(token);
return res.status(204).end();
};

module.exports = {
  findAll,
  insert,
  find,
  destroy,
};