const Joi = require('joi');
const { handleJoiLoginValidation } = require('../../utils/errorHelpers');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).error(handleJoiLoginValidation);

module.exports = {
  loginSchema,
};
