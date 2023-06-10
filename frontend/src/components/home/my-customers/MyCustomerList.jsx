import React, { useContext } from "react";
import MyCustomerItem from "./MyCustomerItem";
import "./style.scss";
import Portfolio from "../portfolio/Portfolio";
import { SiteContentContext } from "./../../../context/SiteContentContext";
const MyCustomerList = () => {
  const { siteContent, customerList } = useContext(SiteContentContext);
  return (
    <div className="container text-center d-flex flex-column justify-content-center align-items-center ">
      <h4 className="h4 title_of_customers ">Our customers</h4>
      <Portfolio siteContent={siteContent[0]} />
      <div className="my_col1 row p-2">
        {customerList?.map((item, index) => {
          return (
            <div key={item._id} className="col p-1">
              <MyCustomerItem item={item} isOdd={index % 2 === 0} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCustomerList;
