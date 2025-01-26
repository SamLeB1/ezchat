import ChatModel from "../models/Chat";
import MessageModel from "../models/Message";
import { Request, Response } from "express";

type GetMessagesQueryParams = {
  chatId: string;
};

type CreateMessageBody = {
  chatId: string;
  content: string;
  contentType: string;
};

export const getMessages = async (
  req: Request<{}, {}, {}, GetMessagesQueryParams>,
  res: Response
) => {
  try {
    const { chatId } = req.query;
    if (!chatId) {
      res.status(400).json({ error: { message: "chatId not provided." } });
      return;
    }
    const messages = await MessageModel.find({ chat: chatId }).populate(
      "sender",
      "username pfp"
    );
    res.status(200).json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};

export const createMessage = async (
  req: Request<{}, {}, CreateMessageBody>,
  res: Response
) => {
  try {
    const { chatId, content, contentType } = req.body;
    if (!chatId || !content || !contentType) {
      res.status(400).json({ error: { message: "Invalid request body." } });
      return;
    }
    const chat = await ChatModel.findById(chatId);
    if (!chat) {
      res.status(404).json({ error: { message: "Chat not found." } });
      return;
    }
    const message = await MessageModel.create({
      sender: req.user?._id,
      chat: chatId,
      content,
      contentType,
    });
    await message.populate("sender", "username pfp");
    chat.latestMessage = message._id;
    await chat.save();
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: { message: "Internal server error." } });
  }
};
