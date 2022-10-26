const { nameSchema } = require('../controllers/validations/schemas');
const { Category } = require('../models');

const findAll = async () => {
  const result = await Category.findAll();
  return result;
};

const insert = async ({ name }) => {
  nameSchema.validate(name);
  const result = await Category.create({ name });
  return result;
};

module.exports = {
  findAll,
  insert,
};