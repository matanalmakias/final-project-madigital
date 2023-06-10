import { Portfolio } from "../../db/models/portfolio/portfolio.js";
import nodeEvent from "../../nodeEvents/nodeEvents.js";
export const extractFileInfoMiddleware = (req, res, next) => {
  const fileFolder = req.file.destination;
  const fileName = req.file.filename;

  req.fileInfo = {
    fileFolder,
    fileName,
  };

  next();
};

// Middleware to create and save portfolio item
export const createPortfolioItemMiddleware = async (req, res) => {
  const { fileFolder, fileName } = req.fileInfo;

  const newPortfolio = new Portfolio({
    image: `${fileFolder}/${fileName}`,
    category: req.body.category,
    likes: {},
    shares: {},
  });

  await newPortfolio.save();
  res.send("Portfolio item uploaded successfully.");
  return nodeEvent.emit("portfolio-update");
};
