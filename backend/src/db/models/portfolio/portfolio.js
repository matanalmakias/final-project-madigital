import { model } from "mongoose";
import { Schema } from "mongoose";

const portfolioSchema = new Schema({
  image: String,
  category: String,
  likes: {
    likes: { type: Number, default: 0 },
    users: [{ type: Schema.Types.ObjectId, ref: `User` }],
  },
  shares: {
    shares: { type: Number, default: 0 },
    users: [{ type: Schema.Types.ObjectId, ref: `User` }],
  },
  createdAt: { type: Date, default: Date.now() },
});
const Portfolio = model("Portfolio", portfolioSchema);

export { Portfolio };
