import * as express from "express";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user: {
        _id: Types.ObjectId;
        email: string;
        username: string;
        password: string;
        createdAt: NativeDate;
        updatedAt: NativeDate;
        __v: number;
      } | null;
    }
  }
}
