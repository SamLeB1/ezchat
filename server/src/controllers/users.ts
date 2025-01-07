import UserModel from "../models/User";
import { Request, Response } from "express";

type GetUserRouteParams = {
  id: string;
};

type GetUsersQueryParams = {
  search?: string;
};

export const getUser = async (
  req: Request<GetUserRouteParams>,
  res: Response
) => {
  const user = await UserModel.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
    return;
  } else {
    res.status(404).json({ errors: [{ msg: "User not found." }] });
    return;
  }
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
      }).select("-password");
      res.status(200).json(users);
      return;
    }
    const users = await UserModel.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};
