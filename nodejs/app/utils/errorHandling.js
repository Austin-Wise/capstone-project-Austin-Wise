exports.throwError = (code, errorType, errorMessage) => error => {
  if (!error) error = new Error(errorMessage || 'Default Error');
  error.code = code;
  error.errorType = errorType;
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
  res.status(status || error.status || 500).json({
    type: 'error',
    message: message || error.message,
    error,
  });
};
