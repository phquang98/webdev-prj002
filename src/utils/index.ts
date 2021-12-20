import { Request } from "express";
import { Session, SessionData } from "express-session";

// TODO: temp fix for req.session
export type XReq = Request & { session: Session & Partial<SessionData> & { userId?: string; thunghiem?: string } };
