import React from "react";
import { portfoilioContent } from "../../../utils/content";
import "./style.scss";
const Portfolio = ({ siteContent }) => {
  const portfolioContentWithLineBreaks = portfoilioContent.replace(
    /\. /g,
    ".<br/> "
  );
  return (
    <div>
      <p
        dangerouslySetInnerHTML={{ __html: portfolioContentWithLineBreaks }}
        className="portfolio_content"
      ></p>
    </div>
  );
};

export default Portfolio;
