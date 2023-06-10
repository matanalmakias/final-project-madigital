import React from "react";

const Footer = ({ item }) => {
  return (
    <div className="background4 row p-1  justify-content-center text-center">
      <div className="col">
        <p className="label3">Author:</p>
        <p className="p4">{item.author}</p>
      </div>
      <div className="col">
        <p className="label3">Category: </p>
        <p className="p4">{item.category}</p>
      </div>
      <div className="col">
        <p className="label3">Date:</p>
        <p className="p4">
          {item.date && new Date(item.date).toLocaleDateString()}
        </p>
      </div>
      <div className="col">
        <p className="label3">Tags: </p>
        <p className="p4">
          {item.tags.map((item, index) => (
            <span key={index} className="mb-1  ">
              {item}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default Footer;
