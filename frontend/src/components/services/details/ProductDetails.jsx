import React, { useContext, useState } from "react";
import { ProductContext } from "../../../context/ProductContext";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import ProductConfirm from "../ProductConfirm";
import ReactLoading from "react-loading";
import productService from "../../../services/product/product.service";
import EditField from "./EditField";
import { AuthContext } from "../../../context/AuthContext";
import { productList } from "../../../utils/content";
import Features from "./Features";
import Price from "./Price";

const ProductDetails = () => {
  const [interested, setInterested] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditName, setShowEditName] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const [showEditPrice, setShowEditPrice] = useState(false);
  const [showEditFeatures, setShowEditFeatures] = useState(false);
  const { allProducts } = useContext(ProductContext);
  const { isManager } = useContext(AuthContext);
  const id = useParams();

  //const product = productList?.find((item) => item._id == id.id);
  const product = allProducts?.find((item) => item._id === id.id);
  const interestedFunc = () => {
    setShowConfirm((s) => !s);
  };

  return (
    <div className="p-3 d-flex flex-column text-center align-items-center justify-content-center">
      {isLoading ? (
        <ReactLoading
          type={"spin"}
          color={"#ffffff"}
          height={"10%"}
          width={"10%"}
        />
      ) : (
        <div className="background2 p-4 border d-flex flex-column gap-2 text-center">
          {isManager && (
            <p className="p3">Manager - click on one of fields to edit</p>
          )}
          <div onClick={() => setShowEditName((s) => !s)}>
            <label htmlFor="name" className="label1">
              Name
            </label>
            <p className="p2"> {product?.name}</p>
          </div>
          {showEditName && (
            <EditField
              setIsLoading={setIsLoading}
              productId={product?._id}
              sign={`name`}
            />
          )}
          <div onClick={() => setShowEditDescription((s) => !s)}>
            <label htmlFor="desc" className="label1">
              Description
            </label>
            <p className="p2"> {product?.desc}</p>
          </div>
          {showEditDescription && (
            <EditField
              setIsLoading={setIsLoading}
              productId={product?._id}
              sign={`desc`}
            />
          )}
          <Features
            showEditFeatures={showEditFeatures}
            setIsLoading={setIsLoading}
            product={product}
          />

          <Price
            product={product}
            showEditPrice={showEditPrice}
            setIsLoading={setIsLoading}
          />

          <button onClick={() => interestedFunc()} variant="" className="btn5">
            Interest in this product
          </button>
          {showConfirm && (
            <ProductConfirm
              sign={`details`}
              productId={id}
              setIsLoading={setIsLoading}
              setInterested={setInterested}
              setShowConfirm={setShowConfirm}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
