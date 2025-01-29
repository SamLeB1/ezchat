import ChatModel from "../models/Chat";
import { Request, Response } from "express";

type CreateChatBody = {
  userId: string;
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const chats = await ChatModel.find({ users: req.user?._id })
      .sort({ updatedAt: -1 })
      .populate("users", "username")
      .populate({
        path: "latestMessage",
        select: "sender content createdAt",
        populate: { path: "sender", select: "username" },
      });
    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};

export const createChat = async (
  req: Request<{}, {}, CreateChatBody>,
  res: Response
) => {
  try {
    if (!req.body.userId) {
      res.status(400).json({ error: { message: "userId not provided." } });
      return;
    }
    if (req.user?._id.toString() === req.body.userId) {
      res.status(400).json({ error: { message: "userIds must be unique." } });
      return;
    }
    const foundChat = await ChatModel.findOne({
      $and: [{ users: req.user?._id }, { users: req.body.userId }],
    })
      .populate("users", "username")
      .populate({
        path: "latestMessage",
        select: "sender content createdAt",
        populate: { path: "sender", select: "username" },
      });
    if (foundChat) {
      res.status(200).json(foundChat);
      return;
    }
    const chat = await ChatModel.create({
      users: [req.user?._id, req.body.userId],
    });
    await chat.populate("users", "username");
    res.status(201).json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};
