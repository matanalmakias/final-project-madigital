import { model } from "mongoose";
import { Schema } from "mongoose";

//role has a role name: (user/admin/moderator)
const customerSchema = new Schema({
  name: String,
  email: String,
  website: String,
  phone: String,
  image: String,
  date: { type: Date, default: Date.now() },
});

const Customer = model("Customer", customerSchema);

export { Customer };
