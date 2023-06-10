import React from "react";
import "./style.scss";
import { Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import { ProductContext } from "../../context/ProductContext";
import productService from "../../services/product/product.service";
import { toast, ToastContainer } from "react-toastify";

const MyProducts = () => {
  const [showCompeletedList, setShowCompeletedList] = useState(true);
  const [showPendingList, setShowPendingList] = useState(true);

  return (
    <div className="background4 p-3">
      <Row className="text-center">
        <Col className="w-50">
          <button
            onClick={() => setShowPendingList((s) => !s)}
            className="w-100 btn8"
          >
            Pending list
          </button>
          {showPendingList && <PendingList />}
        </Col>
        <Col className="w-50">
          <button
            onClick={() => setShowCompeletedList((s) => !s)}
            className=" w-100 btn8"
          >
            Completed list
          </button>
          {showCompeletedList && <CompletedList />}
        </Col>
      </Row>
      <ToastContainer autoClose={1400} />
    </div>
  );
};
const CompletedList = () => {
  const { selfUser } = useContext(AuthContext);
  return <>{selfUser?.products?.compeleted?.map((item) => item)}</>;
};
const PendingList = () => {
  const { selfUser } = useContext(AuthContext);

  return (
    <>
      {selfUser?.products?.pending?.map((item, index) => (
        <PendingItem index={index} id={item} key={item} />
      ))}
    </>
  );
};
const PendingItem = ({ id, index }) => {
  const { allProducts } = useContext(ProductContext);
  const product = allProducts?.find((item) => item._id === id);
  const removeFromPending = () => {
    productService
      .removeFromPending(product?._id)
      .then((res) => toast(res.data.message));
  };
  return (
    <div className="d-flex border1 gap-1 flex-column background4 mt-1 p-2 ">
      <p className="label5  mb-1">{index + 1}</p>
      <div className="col  mb-1">
        <p className="p2 text-secondary  mb-1">{product?.name}</p>
      </div>
      <div className="col p-1  mb-1">
        <p className="p2 text-secondary  mb-1">
          ${product?.startingPrice} per {product?.priceMethod}
        </p>
      </div>
      <div className="col d-flex p-1 text-center justify-content-center  mb-1">
        <button
          onClick={() => removeFromPending()}
          className=" p-1 btn6  mb-1 "
        >
          Remove
        </button>
      </div>
    </div>
  );
};
export default MyProducts;
