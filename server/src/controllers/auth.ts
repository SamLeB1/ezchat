import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User";
import { validationResult } from "express-validator";
import { Request, Response } from "express";
import { Types } from "mongoose";

type LoginBody = {
  username: string;
  password: string;
};

type SignupBody = {
  email: string;
  username: string;
  password: string;
};

function createToken(_id: Types.ObjectId) {
  if (!process.env.SECRET) throw new Error("SECRET is undefined.");
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "1d" });
}

export const login = async (req: Request<{}, {}, LoginBody>, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res
        .status(400)
        .json({ error: { message: "All fields must be filled." } });
      return;
    }
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.status(404).json({ error: { message: "Username not found." } });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: { message: "Password is incorrect." } });
      return;
    }
    res.status(200).json({
      token: createToken(user._id),
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};

export const signup = async (
  req: Request<{}, {}, SignupBody>,
  res: Response
) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const message = result.formatWith((error) => error.msg as string).array();
      res.status(400).json({ error: { message } });
      return;
    }
    const { email, username, password } = req.body;
    const foundUser = await UserModel.findOne({
      $or: [{ email }, { username }],
    });
    if (foundUser) {
      if (foundUser.email === email)
        res
          .status(409)
          .json({ error: { message: ["Email is already taken."] } });
      else
        res
          .status(409)
          .json({ error: { message: ["Username is already taken."] } });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      email,
      username,
      password: hash,
    });
    res.status(201).json({
      token: createToken(user._id),
      _id: user._id,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};
