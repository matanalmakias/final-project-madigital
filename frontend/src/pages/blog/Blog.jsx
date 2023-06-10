import React from "react";
import "./style.scss";

import { useContext } from "react";
import { BlogContext } from "../../context/BlogContext";
import BlogList from "../../components/blog/BlogList";

const Blog = () => {
  const { allBlogs } = useContext(BlogContext);
  return (
    <div>
      <div>
        <BlogList blogList={allBlogs} />
      </div>
    </div>
  );
};

export default Blog;
