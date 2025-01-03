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
    createdAt: string;
  } | null;
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
};
