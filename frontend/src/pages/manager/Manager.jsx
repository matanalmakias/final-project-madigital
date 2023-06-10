import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { SiteContentContext } from "./../../context/SiteContentContext";
import ManageCustomerList from "../../components/manager/customer/ManageCustomerList";
import ManageSiteContent from "../../components/manager/site-content/ManageSiteContent";
import Product from "./../../components/manager/product/Product";
import ManageBlog from "../../components/manager/blog/ManageBlog";
const Manager = () => {
  const { siteContent } = useContext(SiteContentContext);
  return (
    <div className="d-grid grid p-2">
      <ManageSiteContent />
      <ManageCustomerList siteContent={siteContent[0]} />
      <Product />
      <ManageBlog />
    </div>
  );
};

export default Manager;
