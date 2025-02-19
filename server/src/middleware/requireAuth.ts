import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/express/custom.types";

type JwtPayload = {
  _id: string;
};

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!process.env.SECRET) {
    res.status(500).json({ error: { message: "SECRET is undefined." } });
    return;
  }
  const { authorization } = req.headers;
  if (!authorization) {
    res
      .status(401)
      .json({ error: { message: "Authorization token required." } });
    return;
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET) as JwtPayload;
    const user = await UserModel.findById(_id);
    if (!user) {
      res.status(401).json({ error: { message: "User not found." } });
      return;
    }
    req.user = user as User;
    next();
  } catch (err) {
    res.status(401).json({ error: { message: "Authorization failed." } });
  }
}
