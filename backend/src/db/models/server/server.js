import { model } from "mongoose";
import { Schema } from "mongoose";

//role has a role name: (user/admin/moderator)
const serverSchema = new Schema(
  { name: String, portfolioReSize: Boolean, reNameFixed: Boolean },
  { strict: false }
);
const ServerSettings = model("ServerSettings", serverSchema);

export { ServerSettings };
