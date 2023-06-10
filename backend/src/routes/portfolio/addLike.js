import mongoose from "mongoose";
import { Portfolio } from "../../db/models/portfolio/portfolio.js";
import { User } from "../../db/models/user.js";
import nodeEvent from "../../nodeEvents/nodeEvents.js";

// Middleware to update user likes
export const addUserLikesMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.likes) {
      user.likes = {};
    }
    user.likes.likes += 1;
    await user.save();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
export const checkIfUserAlreadyLike = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const portfolio = await Portfolio.findById(portfolioId);
    if (portfolio.likes.users.includes(mongoose.Types.ObjectId(req.userId))) {
      return res.json({ msg: `You already like this portfolio item` });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
// Middleware to update portfolio likes
export const addPortfolioLikesMiddleware = async (req, res) => {
  try {
    const portfolio = req.portfolio;
    portfolio.likes.users.push(mongoose.Types.ObjectId(req.userId));
    portfolio.likes.likes += 1;
    await portfolio.save();

    res.json({ msg: "Like added successfully" });
    return nodeEvent.emit("portfolio-update");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
