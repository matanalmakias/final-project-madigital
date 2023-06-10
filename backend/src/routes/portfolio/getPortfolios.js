import { Portfolio } from "../../db/models/portfolio/portfolio.js";

export async function getAllPortfolios(req, res, next) {
  try {
    const { category } = req.params;
    const portfolios = await Portfolio.find({});
    if (!category) {
      const filteredPortfolios = portfolios.filter(
        (item) => item.category === category
      );
    }
    res.json(portfolios);
  } catch (error) {
    next(error);
  }
}
