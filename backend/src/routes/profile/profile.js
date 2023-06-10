import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { GeneralContact } from "../../db/models/contact/contact.js";
import { User } from "../../db/models/user.js";
import multer from "multer";
import nodeEvents from "../../nodeEvents/nodeEvents.js";
import twilio from "twilio";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
const router = Router();
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const accountSid = "AC07d9ac2a1ce71f3d35d5e47dd69d32df";
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/finishDetails",
  validateToken,
  upload.single("file"),
  async (req, res, next) => {
    let user = await User.findById(req.userId);

    user.name = req.body.name;
    user.phone = req.body.phone;
    user.website = req.body.website;
    if (!user.address) {
      user.address = {}; // create the address object if it doesn't exist
    }
    user.address.city = req.body.city;
    user.address.street = req.body.street;
    user.image = `uploads/${req.file.filename}`;
    user.finishDetails = true;
    await user.save();
    res.json({ message: `The user updated successfully.` });
    return nodeEvents.emit("user");
  }
);
router.put("/editField/:sign", validateToken, async (req, res) => {
  const sign = req.params.sign;

  let user = await User.findById(req.userId);
  if (sign === `name`) {
    user.name = req.body.state;
  } else if (sign === `website`) {
    user.website = req.body.state;
  } else if (sign === `city`) {
    user.address.city = req.body.state;
  } else if (sign === `street`) {
    user.address.street = req.body.state;
  } else if (sign === `phone`) {
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    req.body.state = req.body.state.slice(1);
    req.body.state = `+972${req.body.state}`;
    client.messages.create({
      body: `Your password is ${randomNumber}`,
      from: "+15673623348",
      to: req.body.state,
    });
    user.phoneVerfCode = randomNumber;
    await user.save();
    return res.json({ message: `The code is sent to your phone` });
  } else if (sign === `email`) {
    let randomNumber = Math.floor(100000 + Math.random() * 900000);

    console.log(req.body.state);
    const msg = {
      to: req.body.state,
      from: process.env.EMAIL_ADDRESS,
      subject: "Your password - Madigital.co.il!",
      text: `Your code is ${randomNumber}`,
    };
    sgMail
      .send(msg)
      .then(() => console.log("Email sent"))
      .catch((error) => console.error(error));
    user.emailVerfCode = randomNumber;
    await user.save();
    return res.json({ message: `The code is sent to your email` });

    return nodeEvents.emit("user");
  } else {
    return res.json({ message: `The sign is invalid` });
  }
  await user.save();
  res.json({ message: `User updated successfully` });
  return nodeEvents.emit("user");
});

router.put("/submitPhone/:phone/:verfCode", validateToken, async (req, res) => {
  const { phone, verfCode } = req.params;
  const parsedVerfCode = parseInt(verfCode);

  const user = await User.findById(req.userId);
  if (user.phoneVerfCode !== parsedVerfCode) {
    return res.status(400).json({ message: "Verification code is incorrect" });
  }
  user.phone = phone;
  await user.save();
  res.status(200).json({ message: "User phone updated successfully." });
  return nodeEvents.emit("user");
});
router.put("/submitEmail/:email/:verfCode", validateToken, async (req, res) => {
  const { email, verfCode } = req.params;
  const parsedVerfCode = parseInt(verfCode);

  const user = await User.findById(req.userId);
  if (user.emailVerfCode !== parsedVerfCode) {
    return res.status(400).json({ message: "Verification code is incorrect" });
  }
  user.email = email;
  await user.save();
  res.status(200).json({ message: "User email updated successfully." });
  return nodeEvents.emit("user");
});

router.post("/generalContact", async (req, res) => {
  const newContact = new GeneralContact({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    msg: req.body.textArea,
  });

  await newContact.save();

  const msg = {
    to: req.body.email,
    from: process.env.EMAIL_ADDRESS,
    subject: "Your contact request",
    text: `Your contact request sended successfully, we will contact you in shortly. Madigital.co.il`,
  };

  const msgToAdmin = {
    to: process.env.EMAIL_ADDRESS,
    from: process.env.EMAIL_ADDRESS,
    subject: `${req.body.name} submit contact! `,
    text: `name: ${req.body.name} , phone: ${req.body.phone} , email: ${req.body.email}`,
  };
  sgMail
    .send(msg)
    .then(() => console.log("Email sent"))
    .catch((error) => console.error(error));
  sgMail
    .send(msgToAdmin)
    .then(() => console.log("Email sent"))
    .catch((error) => console.error(error));
  res.json({ message: `Contact sended successfully!` });
  return nodeEvents.emit("user");
});
export { router as profileRouter };
