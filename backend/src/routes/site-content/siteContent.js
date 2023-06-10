import { Router } from "express";
import { SiteContent } from "../../db/models/site-content/sitecontent.js";
import { validateToken } from "../../middleware/user/validateToken.js";
import { isManager } from "../../middleware/roles/isManager.js";
import nodeEvents from "../../nodeEvents/nodeEvents.js";
const router = Router();

router.get("/", async (req, res) => {
  const siteContent = await SiteContent.find({});
  return res.json(siteContent);
});
router.put(
  "/updateContent/:id/:sign",
  validateToken,
  isManager,
  async (req, res) => {
    const { id, sign } = req.params;

    const siteContent = await SiteContent.findById(id);
    if (sign === `name`) {
      siteContent.name = req.body.name;
    } else if (sign === `homePage`) {
      siteContent.homePageContent = req.body.homePageContent;
    } else if (sign === `blog`) {
      siteContent.blogContent = req.body.blogContent;
    } else if (sign === `contact`) {
      siteContent.contactContent = req.body.contactContent;
    } else if (sign === `portfolio`) {
      siteContent.portfolioContent = req.body.portfolioContent;
    } else if (sign === `services`) {
      siteContent.servicesContent = req.body.servicesContent;
    }
    await siteContent.save();
    res.json({ message: `העדכון התבצע בהצלחה` });
    return nodeEvents.emit("siteContent");
  }
);

router.put(
  "/updatePoint/:index/:contentId",
  validateToken,
  isManager,
  async (req, res) => {
    const { contentId, index } = req.params;
    const siteContent = await SiteContent.findById(contentId);
    let foundPointIndex = siteContent.points.findIndex(
      (_, i) => i === parseInt(index)
    );
    if (foundPointIndex !== -1) {
      siteContent.points[foundPointIndex] = req.body.value;
      await siteContent.save();
      res.status(200).json({ message: "Point updated successfully" });
    } else {
      res.status(404).json({ message: "Point not found" });
    }
  }
);
router.post(
  "/createNewSiteContent",
  validateToken,
  isManager,
  async (req, res) => {
    const newSiteContent = new SiteContent({
      name: req.body.name,
      points: req.body.points,
      homePageContent: req.body.homePageContent,
      portfoilioContent: req.body.portfoilioContent,
      blogContent: req.body.blogContent,
      contactContent: req.body.contactContent,
      servicesContent: req.body.titleContent,
    });
    await newSiteContent.save();
    res.json({ message: `יצרת בהצלחה.`, newSiteContent });
    return nodeEvents.emit("siteContent");
  }
);
export { router as siteContentRouter };
