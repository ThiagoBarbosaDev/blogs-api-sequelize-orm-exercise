const errorCodes = {
  USER_NOT_FOUND: 404,
  TOKEN_NOT_FOUND: 401,
  POST_NOT_FOUND: 404,
  INVALID_TOKEN: 401,
  INVALID_FORMAT: 400,
  INVALID_USER_INPUT: 400,
  FIELD_NOT_FOUND: 400,
  UNEXPECTED_ERROR: 500,
  INVALID_EMAIL: 400,
  INVALID_DISPLAY_NAME: 400,
  INVALID_PASSWORD: 400,
  USER_ALREADY_EXISTS: 409,
  UNAUTHORIZED_USER: 401,
};

module.exports = {
  errorCodes,
};
