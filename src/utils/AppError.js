class AppError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }
}

const handleError = (statusCode, message) => {
  return new AppError(statusCode, message);
};

module.exports = {
  AppError,
  handleError,
};
