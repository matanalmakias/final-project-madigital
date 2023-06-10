import mongoose from "mongoose";
import { Portfolio } from "../../db/models/portfolio/portfolio.js";
import { User } from "../../db/models/user.js";
import nodeEvent from "../../nodeEvents/nodeEvents.js";
// Middleware to fetch portfolio by ID
export const fetchPortfolio = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const portfolio = await Portfolio.findById(portfolioId);

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    req.portfolio = portfolio;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Middleware to update user likes
export const removeUserLikes = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.likes.likes -= 1;
    await user.save();
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
export const checkIfUserDidNotLike = async (req, res, next) => {
  try {
    const { portfolioId } = req.params;
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio.likes.users.includes(mongoose.Types.ObjectId(req.userId))) {
      return res.json({ msg: `You did not like this portfolio item` });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
// Middleware to update portfolio likes
export const removePortfolioLikes = async (req, res) => {
  try {
    const portfolio = req.portfolio;
    portfolio.likes.users.pull(mongoose.Types.ObjectId(req.userId));
    portfolio.likes.likes -= 1;
    await portfolio.save();

    res.json({ msg: "Like removed successfully" });
    return nodeEvent.emit("portfolio-update");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
