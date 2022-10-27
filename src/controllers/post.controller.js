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

const update = async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const { email } = req.token;
  const response = await postService.update(id, payload, email);
  return res.status(200).json(response);
};

const findByQuery = async (req, res) => {
  const { query } = req;
  const result = await postService.findByQuery(query);
  return res.status(200).json(result);
};

const destroy = async (req, res) => {
  const { id } = req.params;
  const { email } = req.token;
  await postService.destroy(id, email);
  return res.status(204).end();
};

const insert = async (req, res) => {
  const payload = req.body;
  const { token } = req;
  const result = await postService.insert(payload, token);
  return res.status(201).json(result);
};

module.exports = {
  findAll,
  find,
  update,
  findByQuery,
  destroy,
  insert,
};