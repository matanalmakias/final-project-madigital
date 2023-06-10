import { Portfolio } from "../../db/models/portfolio/portfolio.js";

export async function getAllCategories(req, res) {
  try {
    const portfolios = await Portfolio.find({});
    const categories = [];
    portfolios.forEach((item) => {
      if (!categories.includes(item.category)) {
        categories.push(item.category);
      }
    });
    return res.json(categories);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
