import { RequestHandler } from "express";
import { db } from "../database";

import { XReq } from "../utils";

export const indexMddlwr: RequestHandler = (req: XReq, res, _next) => {
  return res.status(200).json(`
    Use POSTMAN to send a POST HTTP to /login to test for session.
  `);
};

export const authNZ: RequestHandler = (req: XReq, res, next) => {
  console.log("session", req.session);
  if (req.session.userId) {
    next();
  } else {
    return res.redirect("/login");
  }
};

export const testHomeGet: RequestHandler = (req: XReq, res, _next) => {
  const user = db.find((ele) => ele.id === req.session.userId);
  return res.json(`Success ? `);
};

export const testPostLogin: RequestHandler = (req: XReq, res, _next) => {
  const { userNameHere, passHere } = req.body;
  console.log("from FE", { userNameHere, passHere });
  if (userNameHere && passHere) {
    const findUser = db.find((ele) => ele.username === userNameHere && ele.password === passHere);
    if (findUser) {
      req.session.userId = findUser.id.toString();
      req.session.save();
      console.log("login ok, redirect to home", req.session);
      // return res.redirect("/home");
      return res.json(`Give me the fucking session ID INSIDE THE FUCKING COOKIE STORAGE. ${req.sessionID}`);
    }
  }
  console.log("req.body missing or cant find cred");
  return res.redirect("/");
};

export const thuShowData: RequestHandler = (req: XReq, res, _next) => {
  return res.json(`
    1. ${req.cookies}
    2. ${req.session}
    3. ${req.sessionID}
    4. ${res.cookie}
  `);
};
