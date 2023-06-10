import { model } from "mongoose";
import { Schema } from "mongoose";

//role has a role name: (user/admin/moderator)
const siteContentSchema = new Schema({
  name: String,
  points: Array,
  homePageContent: String,
  servicesContent: Schema.Types.Mixed,
  portfolioContent: String,
  blogContent: String,
  contactContent: String,
  date: { type: Date, default: Date.now() },
});

const SiteContent = model("SiteContent", siteContentSchema);

export { SiteContent };
