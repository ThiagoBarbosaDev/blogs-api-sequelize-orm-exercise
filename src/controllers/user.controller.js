const { userService } = require('../services');

const findAll = async (req, res) => {
  const response = await userService.findAll();
  // console.log('CONTROLLER', req.headers);
  return res.status(200).json(response);
};

const insert = async (req, res) => {
  const userPayload = req.body;
  const response = await userService.insert(userPayload);
  return res.status(201).json(response);
};

module.exports = {
  findAll,
  insert,
};