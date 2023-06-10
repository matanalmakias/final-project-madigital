import React, { useContext } from "react";
import { serverUrl } from "../../utils/utils";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import "./style.scss";
import { AuthContext } from "../../context/AuthContext";
import portfolioService from "../../services/portfolio/portfolio";
import { toast } from "react-toastify";
import ShareButton from "./ShareButton";
import LikeButton from "./LikeButton";

const PortfolioItem = ({ item }) => {
  const { isLoggedIn, selfUser } = useContext(AuthContext);
  const isLiked = item?.likes?.users?.some((item) => item === selfUser?._id);
  const isShared = item?.shares?.users?.some((item) => item === selfUser?._id);
  const href = `${serverUrl}/${item?.image}`;

  const handleShare = async () => {
    try {
      if (isShared) {
        return navigator1(item);
      } else {
        portfolioService.addShare(item?._id).then(async () => {
          navigator1(item);
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const removeLike = (id) => {
    portfolioService.removeLike(id).then((res) => toast(res.data.msg));
  };
  const addLike = (id) => {
    portfolioService.addLike(id).then((res) => toast(res.data.msg));
  };

  const handleLike = () => {
    if (isLiked) {
      removeLike(item?._id);
    } else {
      addLike(item?._id);
    }
  };

  return (
    <div className="portfolio-item">
      <div className="image-container">
        <img
          onClick={() => (window.location.href = href)}
          className="portfolio-image"
          src={`${serverUrl}/${item?.image}`}
          alt=""
        />
      </div>
      {isLoggedIn && (
        <div className="row">
          <div onClick={handleLike} className="col row gap-1 m-1">
            <LikeButton isLiked={isLiked} likes={item?.likes?.likes} />
          </div>
          {/* <div onClick={handleShare} className="col row gap-1 m-1">
            <ShareButton
              item={item}
              isShared={isShared}
              shares={item?.shares?.shares}
            />
          </div> */}
        </div>
      )}
    </div>
  );
};

export default PortfolioItem;
