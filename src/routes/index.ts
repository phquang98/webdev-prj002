import express from "express";
import { indexMddlwr, testHomeGet, testPostLogin, authNZ, thuShowData } from "../middlewares/test";

const sessionRouter = express.Router();

sessionRouter.get("/", indexMddlwr);

sessionRouter.post("/login", testPostLogin);

sessionRouter.get("/home", authNZ, testHomeGet);

sessionRouter.get("/test", thuShowData);

export { sessionRouter };
