import ChatModel from "../models/Chat";
import MessageModel from "../models/Message";
import { Request, Response } from "express";

type GetMessagesQueryParams = {
  chatId: string;
};

type CreateMessageBody = {
  chatId: string;
  content: string;
};

export const getMessages = async (
  req: Request<{}, {}, {}, GetMessagesQueryParams>,
  res: Response
) => {
  try {
    const { chatId } = req.query;
    if (!chatId) {
      res.status(400).json({ errors: [{ msg: "chatId not provided." }] });
      return;
    }
    const messages = await MessageModel.find({ chat: chatId }).populate(
      "sender",
      "username"
    );
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const createMessage = async (
  req: Request<{}, {}, CreateMessageBody>,
  res: Response
) => {
  try {
    const { chatId, content } = req.body;
    if (!chatId || !content) {
      res.status(400).json({ errors: [{ msg: "Invalid request body." }] });
      return;
    }
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      res.status(404).json({ errors: [{ msg: "Chat not found." }] });
      return;
    }
    const message = await MessageModel.create({
      sender: req.user?._id,
      chat: chatId,
      content,
    });
    await message.populate("sender", "username");
    chat.latestMessage = message._id;
    await chat.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};
