import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: 20,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
