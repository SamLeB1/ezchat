import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import { Request, Response, NextFunction } from "express";

type JwtPayload = {
  _id: string;
};

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!process.env.SECRET) {
    res.status(500).json({ msg: "SECRET is undefined." });
    return;
  }
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ msg: "Authorization token required." });
    return;
  }
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET) as JwtPayload;
    req.user = await UserModel.findById(_id);
    next();
  } catch (err) {
    res.status(401).json(err);
  }
}
