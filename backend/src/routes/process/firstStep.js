import { Router } from "express";
import { validateToken } from "../../middleware/user/validateToken.js";
import { User } from "../../db/models/user.js";
import { App } from "../../db/models/process/app.js";
import nodeEvent from "../../nodeEvents/nodeEvents.js";

const router = Router();

router.post("/createApp", validateToken, async (req, res) => {
  const user = await User.findOne({ _id: req.userId });

  const firstStep = {
    target: req.body.firstStep,
    about: req.body.secondStep,
    userInfo: {
      _id: user._id,
      name: req.body.name,
      phone: req.body.phone,
      site: req.body.site,
    },
  };
  const newApp = new App(firstStep);
  await newApp.save();
  res.json({ message: `הבקשה התווספה בהצלחה` });
  return nodeEvent.emit("update");
});

export { router as firstStepRouter };
