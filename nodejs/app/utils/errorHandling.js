exports.throwError = (code, errorType, errorMessage) => err => {
  const error = err || new Error(errorMessage || 'We gooned it.');
  error.code = code;
  error.errorType = errorType;
  if (error.errors)
    // eslint-disable-next-line no-shadow
    error.message = error.errors.map(err => err.message).join('\n');
  throw error;
};

exports.throwIf = (fn, code, errorType, errorMessage) => result => {
  if (fn(result)) {
    return exports.throwError(code, errorType, errorMessage)();
  }
  return result;
};

exports.sendSuccess = (res, message) => data => {
  res.status(200).json({ type: 'success', message, data });
};

exports.sendError = (res, status, message) => error => {
  res.status(status || error.status || error.code || 500).json({
    type: 'error',
    message: message || error.message,
    error,
  });
};
