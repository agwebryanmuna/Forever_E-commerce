import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },
  },
  { minimize: false }
); // mongoose ignores {}, so we add minimize:false so the user is created with an empty({}) cart object

const User = model("user", userSchema);

export default User;
