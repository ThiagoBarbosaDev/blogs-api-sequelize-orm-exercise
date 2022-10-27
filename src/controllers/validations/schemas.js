const Joi = require('joi');
const { handleJoiLoginValidation, 
  handleJoiEmailValidation,
  handleJoiDisplayNameValidation, 
  handleJoiPasswordValidation, 
  throwError } = require('../../utils/errorHelpers');

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
}).error(handleJoiLoginValidation);

const emailRegex = /^[a-z0-9.]+@[a-z0-9]/;

const passwordSchema = Joi.string().min(6).error(
  handleJoiPasswordValidation,
);
const displayNameSchema = Joi.string().min(8).required().error(
  handleJoiDisplayNameValidation,
);
const emailSchema = Joi.string().regex(emailRegex).required().error(
  handleJoiEmailValidation,
);

const nameSchema = Joi
  .string().required().error(() => { throw throwError('FIELD_NOT_FOUND', '"name" is required'); });

const userPostSchema = Joi.object({
  password: passwordSchema,
  displayName: displayNameSchema,
  email: emailSchema,
});

const postPutSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
}).error(() => { throw throwError('FIELD_NOT_FOUND', 'Some required fields are missing'); });

module.exports = {
  loginSchema,
  userPostSchema,
  nameSchema,
  postPutSchema,
};
