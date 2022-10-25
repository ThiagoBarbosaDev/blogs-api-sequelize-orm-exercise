const throwError = (type, message) => ({ type, message });

// const composeErrorMessage = (errorBody, { limit, key }, type) => {
//   let message = errorBody;
//   message = message.replace('{{#limit}}', limit);
//   message = message.replace('{{#label}}', `"${key}"`);
//   message = message.replace('{{#key}}', `"${key}"`);
//   return { message, type };
// };

const handleJoiPasswordValidation = (error) => {
  const { code } = error[0];
  switch (code) {
    case ('string.min'):
      throw throwError('INVALID_PASSWORD',
      '"password" length must be at least 6 characters long');
    default:
      break;
  }
};

const handleJoiDisplayNameValidation = (error) => {
  const { code } = error[0];
  switch (code) {
    case ('string.min'):
      throw throwError('INVALID_DISPLAY_NAME',
      '"displayName" length must be at least 8 characters long');
    default:
      break;
  }
};

const handleJoiEmailValidation = (error) => {
  const { code } = error[0];
  switch (code) {
    case ('string.pattern.base'):
      throw throwError('INVALID_EMAIL', '"email" must be a valid email');
    default:
      break;
  }
};

const handleJoiLoginValidation = (error) => {
  const { code } = error[0];
  console.log(code);
  switch (code) {
    case ('any.required'):
      throw throwError('FIELD_NOT_FOUND', 'Some required fields are missing');
    case ('string.empty'):
      throw throwError('FIELD_NOT_FOUND', 'Some required fields are missing');
    default:
      break;
  }
};

// const handleJoiInsertUserValidation = (error) => {
//   const { code } = error[0];
//   console.log(code);
//   switch (code) {
//     case ('any.required'):
//       throw throwError('FIELD_NOT_FOUND', 'Some required fields are missing');
//     case ('string.empty'):
//       throw throwError('FIELD_NOT_FOUND', 'Some required fields are missing');
//     default:
//       break;
//   }
// };

module.exports = {
  handleJoiLoginValidation,
  throwError,
  handleJoiEmailValidation,
  handleJoiDisplayNameValidation,
  handleJoiPasswordValidation,
};