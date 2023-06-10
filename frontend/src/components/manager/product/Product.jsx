import React, { useContext } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import productService from "./../../../services/product/product.service";
import { toast } from "react-toastify";
import AddProduct from "./AddProduct";
import { ProductContext } from "../../../context/ProductContext";
import { productList } from "../../../utils/content";
import { useNavigate } from "react-router-dom";

const Product = () => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showManageProducts, setShowManageProducts] = useState(false);
  const [showEditProducts, setShowEditProducts] = useState(false);
  return (
    <div className="d-flex flex-column gap-1">
      <Button
        onClick={() => setShowManageProducts((s) => !s)}
        className="btn4 text-secondary"
      >
        Manage products
      </Button>

      {showManageProducts && (
        <div className="p-1 d-flex flex-column gap-1">
          <Button
            onClick={() => setShowAddProduct((s) => !s)}
            className="btn4 text-secondary"
          >
            Add product
          </Button>
          {showAddProduct && <AddProduct />}
          <Button
            onClick={() => setShowEditProducts((s) => !s)}
            className="btn4 text-secondary"
          >
            Edit products
          </Button>
          {showEditProducts && <EditProducts />}
        </div>
      )}
    </div>
  );
};

const EditProducts = () => {
  const { allProducts } = useContext(ProductContext);
  const nav = useNavigate();
  const removeProduct = (productId) => {
    productService
      .deleteProduct(productId)
      .then((res) => toast(res.data.message));
  };
  return (
    <>
      <div className="row p-3 gap-1 background2">
        {allProducts?.map((item) => (
          <div className="col background2 p-4" key={item._id}>
            <p className=" label1 p-1">{item.name}</p>
            <div className="row gap-1">
              <Button
                onClick={() => removeProduct(item._id)}
                className="col rounded p-1"
                variant="danger"
              >
                Delete
              </Button>
              <Button
                onClick={() => nav(`/product/${item._id}`)}
                className="col rounded p-1"
                variant="primary"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Product;
