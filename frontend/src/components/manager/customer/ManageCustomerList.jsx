import React from "react";
import { useState } from "react";
import "../style.scss";
import { BiMinus } from "react-icons/bi";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useEffect } from "react";
import customerService from "../../../services/customers/customer.service";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { SiteContentContext } from "../../../context/SiteContentContext";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../../../utils/utils";
import CreateCustomer from "./CreateCustomer";
const ManageCustomerList = ({ siteContent }) => {
  const [showManageCustomers, setShowManageCustomers] = useState(false);
  const { customerList } = useContext(SiteContentContext);
  const nav = useNavigate();
  const removeCustomer = async (customerId) => {
    customerService
      .removeCustomer(customerId)
      .then((res) => toast(res.data.message));
  };
  return (
    <div className="">
      <p
        onClick={() => setShowManageCustomers((state) => !state)}
        className="text-center btn1 mb-1"
      >
        Manage customers
      </p>
      <div
        className={
          showManageCustomers
            ? "d-flex flex-column justify-content-center mb-1 text-center"
            : "hide_class"
        }
      >
        <CreateCustomer siteContent={siteContent} />
        {customerList.map((item, index) => (
          <div className="row p-1" key={item._id}>
            <div className="col-9 ">
              <button
                onClick={() => nav(`/customer/${item._id}`)}
                className="btn3 btn-block border w_90"
              >
                {item.name}
              </button>
            </div>
            <div
              onClick={() => removeCustomer(item._id)}
              className="col-3 w_10 background1"
            >
              <BiMinus />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManageCustomerItem = ({ item, index }) => {
  const [showItem, setShowItem] = useState(false);
  return (
    <div className="text-center">
      <p onClick={() => setShowItem((s) => !s)} className="bg-light mb-1">
        {item.name}
      </p>
      <div className={showItem ? "" : "hide_class"}>
        <p className="text1">{item.link}</p>
      </div>
    </div>
  );
};

export default ManageCustomerList;
