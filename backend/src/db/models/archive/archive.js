import mongoose, { model, mongo } from "mongoose";
import { Schema } from "mongoose";

const archiveSchema = new Schema({}, { strict: false });
const Archive = model("Archive", archiveSchema);

export { Archive };
