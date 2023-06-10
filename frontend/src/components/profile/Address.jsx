import React from "react";
import { user } from "../../utils/utils.js";
import { useState } from "react";
import EditField from "./EditField.jsx";
const Address = ({ selfUser, showAddress, setShowAddress }) => {
  const [showEditStreet, setShowEditStreet] = useState(false);
  const [showEditCity, setShowEditCity] = useState(false);
  return (
    <div>
      <p
        onClick={() => setShowAddress((state) => !state)}
        className="btn1  shadow  mb-1"
      >
        Address
      </p>
      <div className={showAddress ? "row p-1" : "hide_class"}>
        <div className="col w-100">
          <label className="p1 mb-1 p-1" htmlFor="city">
            City
          </label>
          <p
            onClick={() => setShowEditCity((s) => !s)}
            className="contact_form_label mb-1"
          >
            {selfUser?.address?.city}
          </p>
        </div>
        <div className={showEditCity ? "" : "hide_class"}>
          <EditField selfUser={selfUser} sign={`city`} />
        </div>
        <div className="col w-100">
          <label className="p1 mb-1 p-1" htmlFor="city">
            Street
          </label>
          <p
            onClick={() => setShowEditStreet((s) => !s)}
            className="contact_form_label"
          >
            {selfUser?.address?.street}
          </p>
        </div>
        <div className={showEditStreet ? "" : "hide_class"}>
          <EditField selfUser={selfUser} sign={`street`} />
        </div>
      </div>
    </div>
  );
};

export default Address;
