import mongoose from "mongoose";
import { Portfolio } from "../../db/models/portfolio/portfolio.js";
import { User } from "../../db/models/user.js";
import nodeEvent from "../../nodeEvents/nodeEvents.js";
// Middleware to update user likes

export const initializeBeforeAddShare = async (req, res, next) => {};
export const addUserShares = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.shares.shares += 1;
    await user.save();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
export const checkIfUserAlreadyShares = async (req, res, next) => {
  try {
    if (
      req.portfolio.shares.users.includes(mongoose.Types.ObjectId(req.userId))
    ) {
      return res.json({ msg: `You already share this portfolio item` });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
// Middleware to update portfolio likes
export const addPortfolioShares = async (req, res) => {
  try {
    const portfolio = req.portfolio;
    portfolio.shares.users.push(mongoose.Types.ObjectId(req.userId));
    portfolio.shares.shares += 1;
    await portfolio.save();

    res.json({ msg: "Share added successfully" });
    return nodeEvent.emit("portfolio-update");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
