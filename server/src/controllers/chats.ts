import ChatModel from "../models/Chat";
import { Request, Response } from "express";

type CreateChatBody = {
  userId: string;
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await ChatModel.find({ users: req.user?._id });
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createChat = async (
  req: Request<{}, {}, CreateChatBody>,
  res: Response
) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ errors: [{ msg: "userId not provided." }] });
      return;
    }
    const foundChat = await ChatModel.findOne({
      $and: [{ users: req.user?._id }, { users: req.body.userId }],
    });
    if (foundChat) {
      res.status(200).json(foundChat);
      return;
    }
    const chat = await ChatModel.create({
      users: [req.user?._id, req.body.userId],
    });
    res.status(201).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
};