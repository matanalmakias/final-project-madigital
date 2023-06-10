import mongoose, { model, mongo } from "mongoose";
import { Schema } from "mongoose";
const commentSchema = new Schema({
  author: String,
  date: Date,
  content: String,
});
const likesSchema = new Schema({
  _id: false,
  likes: { type: Number, default: 0 },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
const sharesSchema = new Schema({
  _id: false,
  shares: { type: Number, default: 0 },
  users: [{ type: Schema.Types.ObjectId, ref: "User" }],
});
//role has a role name: (user/admin/moderator)
const blogSchema = new Schema({
  title: String,
  desc: String,
  content: String,
  date: { type: Date, default: Date.now() },
  comments: [commentSchema],
  tags: Array,
  category: String,
  image: String,
  author: String,

  likes: likesSchema,
  shares: sharesSchema,
  authorUserId: { type: Schema.Types.ObjectId, ref: "User" },
});
const BlogPost = model("BlogPost", blogSchema);

export { BlogPost };
