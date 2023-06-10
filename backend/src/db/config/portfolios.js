import { Portfolio } from "../models/portfolio/portfolio.js";

const fileNames = [
  `logo-mirc-2.jpg`,
  `social-delacasa-1.jpg`,
  `social-delacasa-2.jfif`,
  `social-delacasa-3.jpg`,
  `social-delacasa-4.jpg`,
  `social-delacasa-5.jpg`,
  `social-magash-1.jpg`,
  `social-magash-2.jpg`,
  `social-magash-3.jpg`,
  `website-alefhet-1.png`,
  `website-gymini-1.png`,
  `website-gymini-2.png`,
  `website-madigital-1.png`,
  `website-mirc-1.png`,
  `website-mirc-3.png`,
  `website-mirc-4.png`,
  `website-mirc-5.png`,
  `website-mirc-6.png`,
  `website-mirc-7.png`,
  `website-mirc-8.png`,
  `website-mirc-9.png`,
  `website-mirc-11.png`,
  `website-mirc-13.png`,
  `website-mirc-15.png`,
  `website-mirc-17.png`,
  `website-mirc-18.png`,
  `website-rent4u-1.png`,
  `website-rent4u-2.png`,
  `website-rent4u-3.png`,
  `website-rent4u-4.png`,
  `website-rent4u-5.png`,
  `website-rent4u-6.png`,
  `website-rent4u-7.png`,
];
const portfoliosArr = () => {
  const arr = fileNames.map((fileName) => {
    const hyphenIndex = fileName.indexOf("-");
    const category = hyphenIndex !== -1 ? fileName.slice(0, hyphenIndex) : "";

    return { image: `uploads/portfolio/${fileName}`, category };
  });

  return arr;
};

export const generateDefaultPortfolios = async () => {
  const portfolioDB = await Portfolio.find({});
  if (portfolioDB.length === 0) {
    const portfolios = portfoliosArr();

    portfolios.forEach(async (item, index) => {
      const newPortfolio = new Portfolio({
        image: item.image,
        category: item.category,
      });
      await newPortfolio.save();
    });
  }
};
