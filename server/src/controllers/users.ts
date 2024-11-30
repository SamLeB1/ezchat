import UserModel from "../models/User";
import { Request, Response } from "express";

type GetUsersQueryParams = {
  search?: string;
};

export const getUsers = async (
  req: Request<{}, {}, {}, GetUsersQueryParams>,
  res: Response
) => {
  try {
    if (req.query.search) {
      const { search } = req.query;
      const users = await UserModel.find({
        username: { $regex: search, $options: "i" },
      });
      res.status(200).json(users);
      return;
    }
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
