import { model, mongo } from "mongoose";
import { Schema } from "mongoose";
const productsSchema = new Schema({
  _id: false,
  pending: Array,
  completed: Array,
});
const addressSchema = new Schema({
  _id: false,
  city: String,
  street: String,
});
const likesSchema = new Schema({
  _id: false,
  likes: { type: Number, default: 0 },
  posts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
});
const sharesSchema = new Schema({
  _id: false,
  shares: { type: Number, default: 0 },
  posts: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
});
const postsSchema = new Schema({
  _id: false,
  pending: [{ type: Schema.Types.ObjectId, ref: "PendingBlogPost" }],
  publish: [{ type: Schema.Types.ObjectId, ref: "BlogPost" }],
});

const userSchema = new Schema({
  isComplete: { type: Boolean, required: false, default: false, unique: false },
  email: { type: String, unique: true, required: true },
  verficationCode: { type: Number, required: false, unique: true },
  phone: String,
  website: { type: String, default: "" },
  name: { type: String, default: "" },
  image: String,
  products: productsSchema,
  phoneVerfCode: Number,
  emailVerfCode: Number,
  address: addressSchema,
  finishDetails: Boolean,
  likes: likesSchema,
  shares: sharesSchema,
  posts: postsSchema,
  cooldownEndTime: { type: Date, default: null },

  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const User = model("User", userSchema);

export { User };
