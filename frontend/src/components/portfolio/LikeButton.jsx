import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const LikeButton = ({ isLiked, likes }) => {
  const handleLike = () => {
    // Handle like action here
  };

  return (
    <p onClick={handleLike} className="like-button cursor card">
      {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      {likes}
    </p>
  );
};

export default LikeButton;
