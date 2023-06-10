import { Router } from "express";
import jwt from "jsonwebtoken";
import authConfig from "../db/config/auth.config.js";
import _ from "underscore";
import { User } from "../db/models/user.js";
import { Role } from "../db/models/role.js";
import { validateToken } from "../middleware/user/validateToken.js";
import { isManager } from "../middleware/roles/isManager.js";
import bcrypt from "bcryptjs";
import nodeEvents from "../nodeEvents/nodeEvents.js";

import { google } from "googleapis";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
const router = Router();
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   port: 587,
//   secure: false, // true for 465, false for other ports
//   auth: {
//     user: "info@madigital.co.il",
//     pass: "asdsdas2134reSS@@",
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// <<------------ Get Self Use ------------->>
router.post("/superPutManager", validateToken, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  const role = await Role.findOne({ name: "manager" });

  const check = user.roles?.includes(role._id);
  if (check) {
    return res.json({ message: `אתה כבר מנהל` });
  }
  user?.roles?.push(role._id);

  await user.save();
  return nodeEvents.emit("user");
});
// <--------- Edit Email --------->
router.post("/editEmail", validateToken, async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "אימייל חובה" });
    }
    const user = await User.findOne({ _id: req.userId });
    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }
    if (email === user.email) {
      return await res.json({ message: "אין שינוי, שלחת אותו אימייל." });
    }
    user.email = email;
    await user.save();
    res.json({ message: "האימייל עודכן בהצלחה." });
    return nodeEvents.emit("user");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// --------- Delete All Users ---------
router.delete("/deleteAll", validateToken, isManager, async (req, res) => {
  try {
    await User.deleteMany({});
    res.json({ message: `All users are deleted!` });
    return nodeEvents.emit("user");
  } catch (error) {
    console.log(error.message);
  }
});

// GET Self USER
router.get("/getSelfUser", validateToken, async (req, res) => {
  User.findOne({ _id: req.userId })
    .then((user) => {
      res.json(user);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});
// GET All USERS
router.get("/", (req, res) => {
  User.findOne()
    .then((user) => {
      res.json(user);
    })
    .catch((e) => res.status(500).json({ message: "Error", error: e }));
});

// < -------------- Final Login ---------------- >
router.post("/finalLogin/:email/:verfCode", async (req, res) => {
  //email and password:

  const body = req.body;
  let email = req.params.email;
  const verfCode = req.params.verfCode;
  let verfCodeAsNumber = parseInt(verfCode);
  let user = await User.findOne({ email: email }).populate("roles");

  if (user.isComplete === false) {
    user.address = {}; // Initialize the address object
    user.address.city = body.city;
    user.address.street = body.street;
    user.address.houseNumber = body.houseNumber;
    user.address.floor = body.floor;
    user.isComplete = true;
    await user.save();
  }
  if (user.verficationCode === verfCodeAsNumber) {
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: "30d",
    });
    const authorities = [];
    for (let i = 0; i < user.roles.length; i++) {
      authorities.push(`ROLE_` + user.roles[i].name.toUpperCase());
    }
    user.finishDetails = true;
    res.status(200).json({
      id: user.id,
      email: `${email}`,
      roles: authorities,
      accessToken: token,
    });
    return nodeEvents.emit("user");
  } else {
    return res.json({ message: `הקוד ששלחת לא נכון` });
  }
});
//<-----------Login Try HERE --------------->
router.post("/tryLogin/:email", async (req, res) => {
  try {
    const email = req.params.email;

    let user = await User.findOne({ email: email });

    let isRegistered = false;
    let randomNumber = Math.floor(100000 + Math.random() * 900000);
    if (user !== null) {
      user.verficationCode = randomNumber;
      await user.save();
      isRegistered = true;
    }
    if (user === null) {
      const role = await Role.findOne({ name: "user" });
      const newUser = new User({
        email: email,
        verficationCode: randomNumber,
        roles: [role],
      });

      await new Promise(async (resolve, reject) => {
        newUser.save(async (error, savedUser) => {
          if (error) {
            reject(error);
          } else {
            isRegistered = true;

            resolve(savedUser);
          }
        });
      });
    }
    if (isRegistered === true) {
      const msg = {
        to: email,
        from: process.env.EMAIL_ADDRESS,
        subject: "Welcome to Madigital!",
        text: `Your code is ${randomNumber}`,
      };
      sgMail
        .send(msg)
        .then(() => console.log("Email sent"))
        .catch((error) => console.error(error));
    }
    res.json({ message: `הקוד נשלח אליך לאימייל.` });
    return nodeEvents.emit("user");
  } catch (e) {
    return res.status(500).json({ message: "Server DB Error", error: e });
  }
});

export { router as authRouter };
