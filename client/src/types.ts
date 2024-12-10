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
