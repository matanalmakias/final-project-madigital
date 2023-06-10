import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Login from "../login/Login";
import productService from "../../services/product/product.service";
import { toast } from "react-toastify";

const ProductConfirm = ({
  setInterested,
  sign,
  setIsLoading,
  setShowConfirm,
  showConfirm,
  productId,
}) => {
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const handleYesClick = () => {
    setInterested(true);
    setIsLoading((s) => !s);
    if (sign === `details`) {
      productService
        .interestInProduct(productId.id)
        .then((res) => toast(res.data.message))
        .finally(() => setIsLoading(false));
    } else
      productService
        .interestInProduct(productId)
        .then((res) => toast(res.data.message))
        .finally(() => setIsLoading(false));
  };

  const handleNoClick = () => {
    setInterested(false);
    setShowConfirm((s) => !s);
  };
  if (!isLoggedIn && showConfirm) {
    return (
      <>
        <p className="btn4" onClick={() => setShowLogin((s) => !s)}>
          You must log in
        </p>
        {showLogin && <Login />}
      </>
    );
  }
  return (
    <div>
      <p className="label3 mt-1 mb-1">Are you sure?</p>
      <div className="row">
        <div className="col">
          <button className="btn5" onClick={() => handleYesClick()}>
            Yes
          </button>
        </div>
        <div className="col">
          <button className="btn5" onClick={() => handleNoClick()}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductConfirm;
