import UserModel from "../models/User";
import cloudinary from "../cloudinary";
import { Request, Response } from "express";

type GetUserRouteParams = {
  id: string;
};

type GetUsersQueryParams = {
  search?: string;
};

type UploadPfpBody = {
  img: string;
};

function getPublicId(imgUrl: string) {
  return imgUrl.split("/").pop()?.split(".")[0];
}

export const getUser = async (
  req: Request<GetUserRouteParams>,
  res: Response
) => {
  const user = await UserModel.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
    return;
  } else {
    res.status(404).json({ error: { message: "User not found." } });
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
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};

export const uploadPfp = async (
  req: Request<{}, {}, UploadPfpBody>,
  res: Response
) => {
  try {
    const img = req.body.img;
    if (!img) {
      res.status(400).json({ error: { message: "img not provided." } });
      return;
    }
    const user = await UserModel.findById(req.user?._id);
    if (!user) {
      res.status(404).json({ error: { message: "User not found." } });
      return;
    }
    const oldPfp = user.pfp;
    const uploadedImg = await cloudinary.uploader.upload(img, {
      folder: "ezchat",
    });
    user.pfp = uploadedImg.secure_url;
    await user.save();
    await cloudinary.uploader.destroy(`ezchat/${getPublicId(oldPfp)}`);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};
