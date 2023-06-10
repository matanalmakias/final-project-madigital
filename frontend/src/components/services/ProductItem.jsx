import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { AuthContext } from "./../../context/AuthContext";
import Login from "../login/Login";
import ReactLoading from "react-loading";
import { serverUrl } from "./../../utils/utils";
import ProductConfirm from "./ProductConfirm";
import { useEffect } from "react";
const ProductItem = ({ item, setIsLoading, isLoading }) => {
  const [expanded, setExpanded] = useState(false);
  const [interested, setInterested] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [alreadyInterested, setAlreadyInterested] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const { isLoggedIn, selfUser } = useContext(AuthContext);

  useEffect(() => {
    const isIncluded = selfUser?.products?.pending?.some(
      (productId) => item._id === productId
    );
    if (isIncluded) {
      setAlreadyInterested(true);
    } else {
      setAlreadyInterested(false);
    }
  }, [selfUser]);
  const nav = useNavigate();
  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const interestedFunc = () => {
    setShowConfirm((s) => !s);
  };
  const divStyle = {
    position: "relative",

    backgroundImage: `url(${serverUrl}/${item?.image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const bgStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: `18px`,
    opacity: 1,
    backdropFilter: "blur(1px)", // Add this line to apply a blur effect
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
    padding: "4px",
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
    <div className="point-item2  p-3" style={divStyle}>
      {isLoading ? (
        <ReactLoading
          type={"spin"}
          color={"#ffffff"}
          height={"10%"}
          width={"10%"}
        />
      ) : (
        <>
          <div style={bgStyle}></div>
          <div className="row" style={contentStyle}>
            <p className="label1">{item?.name}</p>
            <p className="p2 p-2">
              {expanded ? item?.desc : item?.desc.slice(0, 60) + "..."}
            </p>
            <p className="p3">
              Starting from ${item?.startingPrice} per {item?.priceMethod}
            </p>
            <div className="row ">
              <div className="col">
                {item?.desc.length > 60 && (
                  <button className="btn4" onClick={handleExpand}>
                    {expanded ? "Read less" : "Read more"}
                  </button>
                )}
              </div>
              <div className="col">
                <button
                  onClick={() => nav(`/product/${item?._id}`)}
                  className="btn4"
                >
                  Details
                </button>
              </div>
              <div className="col">
                {alreadyInterested ? (
                  <button
                    onClick={() => nav("/user/products")}
                    className=" btn8 "
                  >
                    You are interested in this item
                  </button>
                ) : (
                  <button
                    onClick={() => interestedFunc()}
                    className="btn5 w-100"
                  >
                    Interested in this product
                  </button>
                )}
                {showConfirm && (
                  <ProductConfirm
                    productId={item._id}
                    setIsLoading={setIsLoading}
                    setInterested={setInterested}
                    setShowConfirm={setShowConfirm}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductItem;
