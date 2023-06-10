import React from "react";
import { BsShare } from "react-icons/bs";
import portfolioService from "../../services/portfolio/portfolio";
import { toast } from "react-toastify";
import { serverUrl } from "../../utils/utils";

const ShareButton = ({ isShared, shares, item }) => {
  const navigator1 = async (item) => {
    if (navigator.share) {
      await navigator.share({
        title: document.title,
        text: shares,
        url: `${serverUrl}/${item.image}`,
      });
      console.log("Shared successfully");
    } else {
      console.log("Web Share API not supported");
    }
  };
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

  return (
    <p onClick={handleShare} className="share-button cursor card">
      <BsShare /> {shares}
    </p>
  );
};

export default ShareButton;
