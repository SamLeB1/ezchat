export type Chat = {
  _id: string;
  users: {
    _id: string;
    username: string;
  }[];
  latestMessage: {
    _id: string;
    sender: {
      _id: string;
      username: string;
    };
    content: string;
  } | null;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type Message = {
  _id: string;
  sender: {
    _id: string;
    username: string;
  };
  chat: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};