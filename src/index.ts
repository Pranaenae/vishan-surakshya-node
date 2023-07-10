import mongoose from "mongoose";
import app from "./config/express";
import dotenv from "dotenv";

// import config from './config/config';
// import logger from './modules/logger/logger';

dotenv.config();

let server: any;
mongoose.connect(process.env.MONGO_URL as string).then(() => {
  // logger.info("Connected to MongoDB");
  console.log("db..........");
  server = app.listen(process.env.PORT, () => {
    // logger.info(`Listening to port ${process.env.PORT}`);
    console.log(`Listening to port ${process.env.PORT}`);
  });
});

// const exitHandler = () => {
//   if (server) {
//     server.close(() => {
//       logger.info("Server closed");
//       process.exit(1);
//     });
//   } else {
//     process.exit(1);
//   }
// };

// const unexpectedErrorHandler = (error: string) => {
//   logger.error(error);
//   exitHandler();
// };

// process.on("uncaughtException", unexpectedErrorHandler);
// process.on("unhandledRejection", unexpectedErrorHandler);

// process.on("SIGTERM", () => {
//   logger.info("SIGTERM received");
//   if (server) {
//     server.close();
//   }
// });
