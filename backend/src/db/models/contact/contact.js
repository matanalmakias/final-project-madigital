import mongoose, { model, mongo } from "mongoose";
import { Schema } from "mongoose";

//role has a role name: (user/admin/moderator)
const contactSchema = new Schema({
  name: String,
  phone: Number,
  email: String,
});
const GeneralContact = model("GeneralContact", contactSchema);

export { GeneralContact };
