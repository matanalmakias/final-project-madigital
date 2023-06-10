import React, { useContext } from "react";
import BlogList from "./BlogList";
import { BlogContext } from "../../context/BlogContext";
const Blog = () => {
  const { allBlogs } = useContext(BlogContext);
  return (
    <div>
      <BlogList blogList={allBlogs} />
    </div>
  );
};

export default Blog;
