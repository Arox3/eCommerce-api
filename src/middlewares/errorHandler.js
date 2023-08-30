const { getReasonPhrase } = require("http-status-codes");
const { AppError } = require("../utils/AppError");

const errorHandler = (error, req, res, next) => {
  console.error("Error:", error.message);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      result: getReasonPhrase(error.statusCode),
      message: error.message,
    });
  }

  return res.status(500).json({
    status: 500,
    result: getReasonPhrase(500),
    errorCode: error.message,
  });
};

module.exports = errorHandler;
