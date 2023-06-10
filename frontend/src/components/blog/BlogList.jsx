import React, { useContext } from "react";
import BlogItem from "./BlogItem";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const BlogList = ({ blogList }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();
  return (
    <>
      {isLoggedIn && (
        <div className="row text-center  align-items-center justify-content-center">
          <button
            onClick={() => nav("/blog/add-post")}
            className="col btn4 hover2"
          >
            Add post
          </button>
        </div>
      )}
      <div className="m-1 p-3 d-flex flex-column gap-1 background4">
        {blogList?.map((item, index) => (
          <BlogItem key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};
export default BlogList;
