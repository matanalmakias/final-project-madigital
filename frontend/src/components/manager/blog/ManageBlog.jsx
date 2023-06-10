import { useState } from "react";
import AddPost from "./AddPost";
import { useContext } from "react";
import { BlogContext } from "../../../context/BlogContext";
import BlogItem from "../../blog/BlogItem";
import { useEffect } from "react";
import ManagePendingPosts from "./ManagePendingPosts";
const ManageBlog = () => {
  const [showManageBlog, setShowManageBlog] = useState(false);
  const [showAddPost, setShowAddPost] = useState(false);
  const [showManagePendingPosts, setShowManagePendingPosts] = useState(false);
  const [showManagePosts, setShowManagePosts] = useState(false);
  return (
    <div className="mt-1">
      <button onClick={() => setShowManageBlog((s) => !s)} className="btn4">
        Manage blog
      </button>
      {showManageBlog && (
        <div className="d-flex flex-column m-2 gap-1">
          <button onClick={() => setShowAddPost((s) => !s)} className="btn3">
            Add post
          </button>
          {showAddPost && <AddPost />}
          <button
            onClick={() => setShowManagePosts((s) => !s)}
            className="btn3"
          >
            Manage posts
          </button>
          {showManagePosts && <ManagePendingPosts sign={`publish`} />}
          <button
            onClick={() => setShowManagePendingPosts((s) => !s)}
            className="btn3"
          >
            Manage pending posts
          </button>
          {showManagePendingPosts && <ManagePendingPosts />}
        </div>
      )}
    </div>
  );
};

export default ManageBlog;
