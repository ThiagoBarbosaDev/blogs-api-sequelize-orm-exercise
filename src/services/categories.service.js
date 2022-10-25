const { Category } = require('../models');

const findAll = async () => {
  const result = await Category.findAll();
  return { type: null, message: 'CATEGORIES-SERVICE', result };
};

module.exports = {
  findAll,
};