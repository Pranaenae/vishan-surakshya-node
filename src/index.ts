import app from "./config/express";
import dotenv from "dotenv";
import logger from "./config/logger";
import datasource from "./config/ormConfig";
import { createServer } from "http";
import { Server } from "socket.io";
// import { socketConnection } from "./middlewares/socketConnection";

dotenv.config();

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// socketConnection(io);

datasource
  .initialize()
  .then(() => {
    logger.info("Connected to MySQL Server!");
    server.listen(process.env.PORT, () => {
      logger.info(`Listening to port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error: string) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});
