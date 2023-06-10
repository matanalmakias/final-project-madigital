import React from "react";
import { homePageContent } from "../../../utils/content";
import "./style.scss";

const HomePageContent = ({ siteContent }) => {
  const homePageContentWithLineBreaks = siteContent?.homePageContent.replace(
    /\. /g,
    ".<br/> "
  );

  return (
    <>
      <h2 className="h2 text-center label1">Welcome to M.A Digital</h2>
      <div
        className="home_page_content"
        dangerouslySetInnerHTML={{ __html: homePageContentWithLineBreaks }}
      />
    </>
  );
};

export default HomePageContent;
