import React, { useEffect, useState } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
const MyCustomerItem = ({ item, isOdd }) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const handleNav = (e) => {
    e.preventDefault();
    window.open(item.website, "_blank");
  };

  useEffect(() => {
    import(`../../../assets/miri/logo.png`).then((module) => {
      setLogoUrl(module.default);
    });
  }, []);
  return (
    <div className="my_col1">
      <div className={`col text-center rounded p-1 ${isOdd ? "odd" : "even"}`}>
        {logoUrl && (
          <div className="d-flex justify-content-center mb-2">
            <img className="image_of_customers" src={logoUrl} alt="" />
          </div>
        )}
        <div className="center1">
          <h4 className="name_of_customers mb-1 h4">{item.name}</h4>
          <a
            className="link_of_customers"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleNav}
          >
            Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyCustomerItem;
