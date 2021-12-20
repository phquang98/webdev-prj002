import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import session from "express-session";

import { xConfig } from "./config";
import { sessionRouter } from "./routes";

dotenv.config();

const app = express();

// --- Top Lv Middlewares ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true
  })
);
// app.use(cors());

// --- Custom mddlwr ---
app.use(session(xConfig.session));
app.use(sessionRouter);

// --- Run server ---
xConfig.cxnMongoDB(); // connect to Mongo

app.listen(xConfig.server.port, () => {
  console.log(`Server started at port ${xConfig.server.port}`);
});
