const throwError = (type, message) => ({ type, message });

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

module.exports = {
  handleJoiLoginValidation,
  throwError,
};