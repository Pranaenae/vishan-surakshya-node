import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf } = winston.format;

// log format
const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// transport for rotating log files
const transport: DailyRotateFile = new DailyRotateFile({
  filename: "./logs/application-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d",
});

// logger instance
const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), logFormat),
  transports: [transport, new winston.transports.Console()],
});

export default logger;
