import React from "react";
import EditField from "./EditField";
import { useState } from "react";
import { Form } from "react-bootstrap";
import productService from "../../../services/product/product.service";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import FeaturesItem from "./FeatureItem";

const Features = ({ product, showEditFeatures, setIsLoading }) => {
  const [newInputs, setNewInputs] = useState([]);
  const { isManager, isModerator } = useContext(AuthContext);
  const handleInputChange = (e, index) => {
    const updatedInputs = [...newInputs];
    updatedInputs[index] = e.target.value;
    setNewInputs(updatedInputs);
  };

  const handleFeatureAdd = (e, index, input) => {
    e.preventDefault();

    productService
      .addFeatures({ input }, product?._id)
      .then((res) => toast(res.data.message));
  };

  return (
    <div className="text-center">
      <label htmlFor="desc" className="label1 mb-1">
        Features
      </label>
      <ul className=" p-1">
        {product?.features?.map((item, index) => (
          <FeaturesItem
            index={index}
            item={item}
            product={product}
            showEditFeatures={showEditFeatures}
            setIsLoading={setIsLoading}
            key={index}
          />
        ))}
        {(isModerator || isManager) && (
          <>
            <button
              className="btn5 "
              onClick={() => setNewInputs([...newInputs, ""])}
            >
              + Add feature
            </button>
            {newInputs.map((item, index) => (
              <Form
                onSubmit={(e) => handleFeatureAdd(e, index, item)}
                className="d-flex "
                key={index}
              >
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter new feature"
                  value={item}
                  onChange={(e) => handleInputChange(e, index)}
                />
                <button type="submit" className="btn5">
                  Submit
                </button>
              </Form>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Features;
