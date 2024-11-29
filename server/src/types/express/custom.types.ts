import { Types } from "mongoose";

export type User = {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  createdAt: NativeDate;
  updatedAt: NativeDate;
  __v: number;
};
