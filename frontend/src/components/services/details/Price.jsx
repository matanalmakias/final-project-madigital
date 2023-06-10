import React from "react";
import EditField from "./EditField";
import { useState } from "react";
import { useEffect } from "react";
import PricingItem from "./PricingItem";

const Price = ({ product, setIsLoading }) => {
  const [showEditPrice, setShowEditPrice] = useState(false);

  return (
    <div>
      <label htmlFor="Price" className="label1">
        Price
      </label>
      <p onClick={() => setShowEditPrice((s) => !s)} className="p2">
        Price is starting from ${product?.startingPrice} per{" "}
        {product?.priceMethod}
      </p>
      {showEditPrice && (
        <EditField
          setIsLoading={setIsLoading}
          productId={product?._id}
          sign={`price`}
        />
      )}
      <div className="row">
        {product?.pricing?.map((item, index) => (
          <PricingItem
            key={index}
            index={index}
            item={item}
            product={product}
            setIsLoading={setIsLoading}
            sign={`pricing`}
          />
        ))}
      </div>
    </div>
  );
};

export default Price;
