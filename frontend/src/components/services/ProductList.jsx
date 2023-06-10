import React, { useState } from "react";
import { productList } from "./../../utils/content";
import { Container } from "react-bootstrap";
import ReactLoading from "react-loading";
import { useEffect } from "react";
import ProductItem from "./ProductItem";
import { useContext } from "react";
import { ProductContext } from "./../../context/ProductContext";
const ProductList = () => {
  const { allProducts } = useContext(ProductContext);

  const [visibleProducts, setVisibleProducts] = useState(
    allProducts?.slice(0, 3)
  );
  const [showAll, setShowAll] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (allProducts) {
      setVisibleProducts(allProducts.slice(0, 3));
    } else {
      setVisibleProducts([]);
    }
  }, [allProducts]);

  const handleShowMore = () => {
    setVisibleProducts(allProducts);
    setShowAll(true);
  };

  const handleShowLess = () => {
    setVisibleProducts(allProducts?.slice(0, 3));
    setShowAll(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      {isLoading ? (
        <ReactLoading
          type={"spin"}
          color={"#ffffff"}
          height={"10%"}
          width={"10%"}
        />
      ) : (
        <div className="row w-100 gap-2 background3 align-items-center justify-content-center">
          {/* allProducts */}
          {visibleProducts?.map((item) => (
            <ProductItem
              key={item._id}
              item={item}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          ))}
          {!showAll ? (
            <button className="btn4" onClick={handleShowMore}>
              Show More
            </button>
          ) : (
            <button className="btn4" onClick={handleShowLess}>
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList;
