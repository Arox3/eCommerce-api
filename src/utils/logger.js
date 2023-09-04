require("winston-mongodb");
const moment = require("moment-timezone");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf } = format;

const logFormat = printf(({ timestamp, level, message }) => {
  return `[${moment(timestamp)
    .tz("Asia/Bangkok")
    .format("YYYY-MM-DD HH:mm:ss")}] [${level}]: ${message}`;
});

const logger = createLogger({
  level: process.env.NODE_ENV === "development" ? "debug" : "info",
  transports: [
    new transports.Console({
      format: combine(format.colorize(), logFormat),
    }),
    new transports.MongoDB({
      level: "warn",
      db: process.env.MONGODB_URI,
      options: { useUnifiedTopology: true },
      collection: "logs",
      format: combine(format.metadata()),
    }),
  ],
});

module.exports = logger;
