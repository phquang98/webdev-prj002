import dotenv from "dotenv";
import { ConnectOptions, connect } from "mongoose";
import { SessionOptions } from "express-session";
import MongoStore from "connect-mongo";

dotenv.config();

// --- Server Config ---
const SERVER_PORT = process.env.SERVER_PORT || 5000;
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";

const SERVER_CONF = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT
};

// --- MongoDB Config ---
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASS = process.env.MONGODB_PASS;
const MONGODB_CXN_STR = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASS}@${process.env.MONGODB_CXN_STR}`;

// TODO: find out wtf all these opt props means
const mongodbCXNOpts: ConnectOptions = {
  socketTimeoutMS: 10000,
  maxPoolSize: 10,
  keepAlive: true,
  autoIndex: false,
  retryWrites: false
  // useNewUrlParser: true,  // deprecated ?
  // useUnifiedTopology: true // deprecated ?
  // useCreateIndex: true; // deprecated ?
  // useFindAndModify: false; // deprecated ?
};

const MONGODB_CONF = {
  cxnUsername: MONGODB_USERNAME, // just for null validation
  cxnPass: MONGODB_PASS, // just for null validation
  cxnStr: MONGODB_CXN_STR,
  cxnOpts: mongodbCXNOpts
};

// --- Session Config ---
// TODO: find out wtf all these opt props means
const sessionOpts: SessionOptions = {
  secret: "very_secret",
  name: "test_cookie",
  store: MongoStore.create({ mongoUrl: MONGODB_CONF.cxnStr }),
  cookie: {
    maxAge: 1000 * 30, //  1000 * 60 * 60 = 1h
    httpOnly: false, // careful with this ???
    secure: false, // careful with this ??? set nodejs trust proxy if use proxy like nginx
    sameSite: "lax" // lax strict none clgt ???
    // path: "wtf",
    // domain: "wtf"
    // signed: true, // wtf
  },
  saveUninitialized: false, // don't save empty session right from start
  resave: false
};

// --- Connection Method ---
// TODO: is this auto closed ? is this still opened & need to close manually ? should this be used to create cxn to session store also ?
const tryCXNMongoDB = async (): Promise<void> => {
  // check missing env variables
  if (!process.env.MONGODB_CXN_STR || Object.values(MONGODB_CONF).some((ele) => ele === undefined || ele === "")) {
    console.log("Missing .env props, cxn can't be made.", MONGODB_CONF);
  } else {
    try {
      await connect(MONGODB_CONF.cxnStr, MONGODB_CONF.cxnOpts);
      console.log("Connect to MongoDB OK!");
    } catch (error) {
      console.log("Something wrong trying to cxn MongoDB", error);
    }
  }
}; //

export const xConfig = {
  server: SERVER_CONF,
  mongodb: MONGODB_CONF,
  session: sessionOpts,
  cxnMongoDB: tryCXNMongoDB
};
