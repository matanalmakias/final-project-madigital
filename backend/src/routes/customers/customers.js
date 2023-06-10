import { Router } from "express";
import { Customer } from "../../db/models/customers/customers.js";
import { validateToken } from "../../middleware/user/validateToken.js";
import { isManager } from "../../middleware/roles/isManager.js";
import multer from "multer";
import nodeEvents from "../../nodeEvents/nodeEvents.js";
import sharp from "sharp";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
const router = Router();

router.delete(
  "/removeCustomer/:customerId",
  validateToken,
  isManager,
  async (req, res) => {
    const customerId = req.params.customerId;
    await Customer.deleteOne({ _id: customerId }).then(() => {
      res.json({ message: `הלקוח נמחק בהצלחה.` });
      return nodeEvents.emit("customers");
    });
  }
);
router.get("/", async (req, res) => {
  const customers = await Customer.find({});
  return res.json(customers);
});
router.put(
  "/updateCustomer/:customerId",
  validateToken,
  isManager,
  upload.single("file"),
  async (req, res) => {
    const customerId = req.params.customerId;
    let newKeyChange = { key: null, value: null };
    for (let key in req.body) {
      if (req.body[key] !== null) {
        newKeyChange.value = req.body[key];
        newKeyChange.key = key;
      }
    }
    const customer = await Customer.findById(customerId);
    if (newKeyChange.key === `nameInput`) {
      customer.name = newKeyChange.value;
    } else if (newKeyChange.key === `emailInput`) {
      customer.email = newKeyChange.value;
    } else if (newKeyChange.key === `phoneInput`) {
      customer.phone = newKeyChange.value;
    } else if (newKeyChange.key === `websiteInput`) {
      customer.website = newKeyChange.value;
    } else if (newKeyChange.key === `imageInput`) {
      customer.image = `uploads/${req.file.filename}`;
    }
    await customer.save();
    res.json({ message: `עודכן בהצלחה.`, customer });
    return nodeEvents.emit("customers");
  }
);
router.post(
  "/createCustomer",
  validateToken,
  isManager,
  upload.single("file"),
  async (req, res) => {
    const newCustomer = new Customer({
      name: req.body.nameInput,
      email: req.body.emailInput,
      phone: req.body.phoneInput,
      website: req.body.websiteInput,
      image: `uploads/${req.file.filename}`,
    });
    await newCustomer.save();
    res.json({ message: `יצירת הלקוח התבצעה.`, newCustomer });
    return nodeEvents.emit("customers");
  }
);
export { router as customerRouter };
