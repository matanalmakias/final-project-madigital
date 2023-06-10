import React from "react";
import { useState } from "react";
import EditField from "./EditField";

const PricingItem = ({
  sign,

  item,
  product,
  index,
  setIsLoading,
}) => {
  const [showEditName, setShowEditName] = useState(false);
  const [showEditPrice, setShowEditPrice] = useState(false);
  const [showEditDescription, setShowEditDescription] = useState(false);

  return (
    <div className="col">
      <p onClick={() => setShowEditName((s) => !s)} className="p4">
        {item?.name}
      </p>
      {showEditName && (
        <EditField
          setIsLoading={setIsLoading}
          productId={product?._id}
          sign={`${sign}-name`}
          pricingIndex={index}
        />
      )}
      <p onClick={() => setShowEditPrice((s) => !s)} className="p2">
        ${item.price}
      </p>
      {showEditPrice && (
        <EditField
          setIsLoading={setIsLoading}
          productId={product?._id}
          sign={`${sign}-price`}
          pricingIndex={index}
        />
      )}
      <p onClick={() => setShowEditDescription((s) => !s)} className="p2">
        {item.description}
      </p>
      {showEditDescription && (
        <EditField
          setIsLoading={setIsLoading}
          productId={product?._id}
          sign={`${sign}-desc`}
          pricingIndex={index}
        />
      )}
    </div>
  );
};
export default PricingItem;
