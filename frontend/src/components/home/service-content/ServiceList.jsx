import React, { useState } from "react";
import { servicesContent } from "./../../../utils/content";
import "./style.scss";
import ServiceItem from "./ServiceItem";
function ServiceList({ siteContent }) {
  const [numPoints, setNumPoints] = useState(4);
  const handleShowMore = () => {
    setNumPoints(siteContent.points.length);
  };

  const handleShowLess = () => {
    setNumPoints(4);
  };

  return (
    <div className="text-center  d-flex flex-column justify-content-center align-items-center ">
      <h4 className="h4 title_of_customers ">Our Services</h4>
      <div>
        <p className="service_content_title">{siteContent?.servicesContent}</p>
        <ul className="row gap-3 p-4 ul_services">
          {siteContent?.points?.slice(0, numPoints).map((item, index) => (
            <ServiceItem key={`service-${index}`} item={item} />
          ))}
        </ul>
        {siteContent?.points.length > 4 && (
          <div className="text-center">
            {numPoints === siteContent.points.length ? (
              <button
                className="btn btn-link bg-light"
                onClick={handleShowLess}
              >
                Show Less
              </button>
            ) : (
              <button
                className="btn btn-link bg-light"
                onClick={handleShowMore}
              >
                Show More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
export default ServiceList;
