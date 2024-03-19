const { Logger } = require('../config/logger');
// eslint-disable-next-line no-unused-vars
exports.errorHandler = (err, req, res, next) => {
  Logger.log('error', {
    req: req,
    errorCode: err.name || 'INTERNAL_SERVER_ERROR',
    message: err.message || 'Internal Server Error',
    user: req.body || req.user || 'User data not provided',
  });
  return res.status(err.statusCode || 500).json({
    error: {
      errorCode: err.name || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Please try again later',
    },
  });
};
