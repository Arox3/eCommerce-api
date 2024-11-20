const moment = require("moment-timezone");
const { getReasonPhrase } = require("http-status-codes");
const { AppError } = require("../utils/AppError");
const logger = require("../utils/logger");

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    logger.warn(error.message, errorDetails(req));
    return res.status(error.statusCode).json({
      statusCode: error.statusCode,
      result: getReasonPhrase(error.statusCode),
      message: error.message,
    });
  }

  console.error(error);
  logger.error(error.message, errorDetails(req));
  return res.status(500).json({
    status: 500,
    result: getReasonPhrase(500),
    errorCode: error.message,
  });
};

const errorDetails = (req) =>
  new Object({
    timeStamp: moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss"),
    requestInfomation: {
      method: req.method,
      originalUrl: req.originalUrl,
      headers: req.headers,
      query: req.query,
      body: req.body,
    },
  });

module.exports = errorHandler;
