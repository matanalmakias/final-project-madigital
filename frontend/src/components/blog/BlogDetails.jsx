import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { BlogContext } from "../../context/BlogContext";
import BlogItem from "./BlogItem";
const BlogDetails = () => {
  const { id } = useParams();
  const { allBlogs } = useContext(BlogContext);
  const post = allBlogs?.find((item) => item._id === id);
  if (post === undefined) return;
  return <BlogItem details={true} item={post} />;
};

export default BlogDetails;
