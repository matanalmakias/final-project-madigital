import { model } from "mongoose";
import { Schema } from "mongoose";

const pricingSchema = new Schema({
  _id: false,
  name: String,
  price: Number,
  description: String,
});

const productSchema = new Schema({
  name: String,
  desc: String,
  startingPrice: Number,
  priceMethod: String,
  pricing: [pricingSchema],
  features: Array,
  image: String,
});
const Product = model("Product", productSchema);

export { Product };
