import React, { useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import blogService from "../../services/blog/blog.service";
import "./style.scss";
import { toast } from "react-toastify";
import { useContext } from "react";
import { hostname } from "../../utils/utils";
const Social = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const { selfUser } = useContext(AuthContext);
  useEffect(() => {
    const isLiked = selfUser?.likes?.posts?.some((post) => post === item._id);
    if (isLiked) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [selfUser]);

  const addLike = () => {
    blogService.addLike(item._id).then((res) => toast(res.data.message));
  };
  const removeLike = () => {
    blogService.removeLike(item._id).then((res) => toast(res.data.message));
  };
  const sharePost = () => {
    const shareUrl = `${hostname}/blog/${item._id}`;
    navigator.share({ title: document.title, url: shareUrl });
  };

  return (
    <div className="row gap-1 background5 p-2 justify-content-center text-center">
      <p className="col ">Likes:</p>
      {liked ? (
        <p onClick={() => removeLike()} className="col button hover1 p2">
          <AiFillHeart /> {item?.likes?.likes}
        </p>
      ) : (
        <p onClick={() => addLike()} className="col button p2 hover1">
          <AiOutlineHeart /> {item?.likes?.likes}
        </p>
      )}
      <p className="col"> Shares:</p>
      <p onClick={() => sharePost()} className="col p1 button hover2">
        <RiShareForwardLine /> {item?.shares?.shares}
      </p>
    </div>
  );
};
export default Social;
