import React, { useContext } from "react";
import { BlogContext } from "../../../context/BlogContext";
import BlogItem from "../../blog/BlogItem";

const ManagePendingPosts = ({ sign }) => {
  const { pendingPosts, allBlogs } = useContext(BlogContext);

  return (
    <div>
      {sign === `publish` ? (
        <PendingList sign={sign} pendingPosts={allBlogs} />
      ) : (
        <PendingList pendingPosts={pendingPosts} />
      )}
    </div>
  );
};
const PendingList = ({ pendingPosts, sign }) => {
  return (
    <div className="m-1 d-flex flex-column gap-1">
      {pendingPosts?.map((item, index) => (
        <div key={index}>
          {sign === `publish` ? (
            <BlogItem sign={`publishList`} item={item} />
          ) : (
            <BlogItem sign={`pendingList`} item={item} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ManagePendingPosts;
