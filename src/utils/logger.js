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
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" })),
  transports: [
    new transports.Console({
      format: combine(format.colorize(), logFormat),
    }),
    new transports.MongoDB({
      level: "warn",
      db: process.env.MONGODB_URI,
      options: { useUnifiedTopology: true },
      collection: "logs",
      format: format.combine(format.json(), format.metadata()),
    }),
  ],
});

module.exports = logger;
