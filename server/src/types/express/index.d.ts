import * as express from "express";
import { User } from "./custom.types";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
