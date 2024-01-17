const { getReasonPhrase } = require("http-status-codes");

exports.handleResponse = (res, statusCode, data, message = null) =>
  res.status(statusCode == 204 ? 200 : statusCode).json({
    statusCode: statusCode,
    result: getReasonPhrase(statusCode),
    data: data,
    message: message,
  });
