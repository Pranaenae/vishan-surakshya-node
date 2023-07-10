import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// enable CORS - Cross Origin Resource Sharing
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);

// request logging. dev: console | production: file
app.use(morgan("combined"));

// parse body params and attache them to req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;
