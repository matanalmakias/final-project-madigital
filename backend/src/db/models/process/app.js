import mongoose, { model } from "mongoose";
import { Schema } from "mongoose";
const userInfoSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: String,
  phone: Number,
  site: String,
});
//role has a role name: (user/admin/moderator)
const createAppSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  target: String,
  about: String,
  userInfo: userInfoSchema,
  date: { type: Date, default: Date.now() },
});
const App = model("App", createAppSchema);

export { App };
