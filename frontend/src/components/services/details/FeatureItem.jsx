import { useState } from "react";
import EditField from "./EditField";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import productService from "../../../services/product/product.service";
import { toast } from "react-toastify";

const FeaturesItem = ({
  index,
  showEditFeatures,
  setIsLoading,
  product,
  item,
}) => {
  const [showItem, setShowItem] = useState(false);
  const { isModerator, isManager } = useContext(AuthContext);
  const deleteItem = () => {
    productService
      .deleteFeatureItem(product?._id, index)
      .then((res) => toast(res.data.message));
  };
  return (
    <div key={index}>
      <li className="col">
        <p onClick={() => setShowItem((s) => !s)} className="p5 col p-2 mb-1">
          {item}
        </p>
        {(isManager || isModerator) && (
          <button
            className="btn-danger btn p-1 mb-1"
            onClick={() => deleteItem()}
          >
            Delete
          </button>
        )}
      </li>
      {showItem && (
        <EditField
          setIsLoading={setIsLoading}
          productId={product?._id}
          sign={`features`}
          featureItemIndex={index}
        />
      )}
    </div>
  );
};
export default FeaturesItem;
