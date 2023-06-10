import { Router } from "express";
import { getAllPortfolios } from "./getPortfolios.js";
import { isManager } from "../../middleware/roles/isManager.js";
import { validateToken } from "../../middleware/user/validateToken.js";
import { getAllCategories } from "./getCategories.js";
import multer from "multer";
import {
  createPortfolioItemMiddleware,
  extractFileInfoMiddleware,
} from "./createItem.js";
import {
  addPortfolioLikesMiddleware,
  addUserLikesMiddleware,
  checkIfUserAlreadyLike,
} from "./addLike.js";
import {
  checkIfUserDidNotLike,
  fetchPortfolio,
  removePortfolioLikes,
  removeUserLikes,
} from "./removeLike.js";
import {
  addPortfolioShares,
  addUserShares,
  checkIfUserAlreadyShares,
} from "./addShare.js";

const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/portfolio"); // Destination folder to save the uploaded file
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fullFilename = uniqueSuffix + "-" + file.originalname; // Append a unique suffix to the original filename
    cb(null, fullFilename);
  },
});

const upload = multer({ storage: storage });

router.put(
  "/addLike/:portfolioId",
  validateToken,
  fetchPortfolio,
  checkIfUserAlreadyLike,
  addUserLikesMiddleware,
  addPortfolioLikesMiddleware
);
router.put(
  "/removeLike/:portfolioId",
  validateToken,
  fetchPortfolio,
  checkIfUserDidNotLike,
  removeUserLikes,
  removePortfolioLikes
);
router.put(
  "/addShare/:portfolioId",
  validateToken,
  fetchPortfolio,
  checkIfUserAlreadyShares,
  addPortfolioShares,
  addUserShares
);
router.post(
  "/create",
  validateToken,
  isManager,
  upload.single("image"),
  extractFileInfoMiddleware,
  createPortfolioItemMiddleware
);

router.get("/getCategories", getAllCategories);

router.get("/:category?", getAllPortfolios);

export { router as portfolioRouter };
