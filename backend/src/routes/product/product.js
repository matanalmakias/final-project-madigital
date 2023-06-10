import { validateToken } from "../../middleware/user/validateToken.js";
import { isManager } from "../../middleware/roles/isManager.js";
import { isModerator } from "../../middleware/roles/isModerator.js";
import { Router } from "express";
import { Product } from "../../db/models/product/product.js";
import nodeEvent from "../../nodeEvents/nodeEvents.js";
import multer from "multer";

import { User } from "../../db/models/user.js";
const router = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  const products = await Product.find({});

  return res.json(products);
});

router.post(
  "/createProduct",
  validateToken,
  isManager,
  upload.single("file"),
  async (req, res) => {
    const image = `uploads/${req.file.filename}`;
    const newProduct = new Product({
      name: req.body.name,
      desc: req.body.desc,
      startingPrice: req.body.startingPrice,
      priceMethod: req.body.priceMethod,
      image: image,
    });

    await newProduct.save();
    res.json({ message: `The product created successfully` });
    return nodeEvent.emit("product");
  }
);

router.delete(
  "/deleteProduct/:productId",
  validateToken,
  isManager,
  async (req, res) => {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      res.json({ message: `Product not found.` });
      throw new Error("Product not found");
    }
    await product.remove();
    res.json({ message: `The product is removed successfully.` });
    return nodeEvent.emit("product");
  }
);

router.post(
  "/interestInProduct/:productId",
  validateToken,
  async (req, res) => {
    const productId = req.params.productId;
    let user = await User.findById(req.userId);
    let product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.json({ message: `Product not found.` });
    }

    if (user.products === undefined) {
      user.products = {};
    }
    if (
      user?.products?.pending?.some((item) => item.toString() === productId)
    ) {
      return res.json({
        message: `This product is already in your pending list`,
      });
    }
    user?.products?.pending?.push(product?._id);
    await user.save();
    res.json({ message: `Product added to pending list successfully` });
    nodeEvent.emit("user");
    return nodeEvent.emit("product");
  }
);
router.post(
  "/addFeature/:productId",
  validateToken,
  isModerator,
  async (req, res) => {
    const productId = req.params.productId;

    let product = await Product.findById(productId);
    product?.features?.push(req.body.input);
    await product.save();

    res.json({ message: `Feature added successfully.` });

    return nodeEvent.emit("product");
  }
);
router.delete(
  "/deleteFeatureItem/:productId/:index",
  validateToken,
  isModerator,
  async (req, res) => {
    const { productId, index } = req.params;
    let product = await Product.findById(productId);
    const foundIndex = product?.features[index];
    if (!foundIndex) {
      return res.json({ message: `The feature is not found` });
    }
    product?.features?.pull(foundIndex);
    await product.save();
    res.json({ message: `Feature deleted successfully.` });

    return nodeEvent.emit("product");
  }
);
router.put(
  "/editField/:productId/:sign",
  validateToken,
  isManager,
  async (req, res) => {
    const { productId, sign } = req.params;
    let product = await Product.findById(productId);
    if (sign === `desc`) {
      product.desc = req.body.body;
    } else if (sign === `name`) {
      product.name = req.body.body;
    } else if (sign === `price`) {
      product.startingPrice = req.body.body;
    } else if (sign === `features`) {
      let foundIndex = product?.features?.findIndex(
        (item, index) => index === req.body.body.featureItemIndex
      );
      if (foundIndex !== undefined) {
        product.features[foundIndex] = req.body.body.input;
      }
    } else if (sign === `pricing-name`) {
      product.pricing[req.body.body.pricingIndex].name =
        req.body.body.pricingInput;
    } else if (sign === `pricing-price`) {
      product.pricing[req.body.body.pricingIndex].price =
        req.body.body.pricingInput;
    } else if (sign === `pricing-desc`) {
      product.pricing[req.body.body.pricingIndex].description =
        req.body.body.pricingInput;
    }
    await product.save();
    res.json({ message: `Product edited successfully.` });
    return nodeEvent.emit("product");
  }
);
router.delete(
  "/removeFromPending/:productId",
  validateToken,
  async (req, res) => {
    const productId = req.params.productId;
    let user = await User.findById(req.userId);
    if (
      !user?.products?.pending.some((item) => item.toString() === productId)
    ) {
    } else {
      const length = user?.products?.pending?.length;
      if (length === 1) {
        user.products.pending = [];
      }
      user?.products?.pending?.pull(productId);

      const remainingProducts = user.products.pending.filter(
        (item) => item.toString() === productId
      );

      await user.save();

      res.json({
        message: `The product successfully removed from pending list`,
      });

      nodeEvent.emit("user");
      return nodeEvent.emit("product");
    }
  }
);
export { router as productRouter };
