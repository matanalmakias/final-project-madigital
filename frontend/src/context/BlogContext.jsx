import { createContext, useContext, useEffect, useState } from "react";
import blogService from "../services/blog/blog.service";
import { SocketContext } from "./SocketContext";
import { AuthContext } from "./AuthContext";

export const BlogContext = createContext({ allBlogs: [], pendingPosts: [] });

export const BlogProvider = ({ children }) => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [pendingPosts, setPendingPosts] = useState([]);
  const socket = useContext(SocketContext);
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    blogService.getAllBlogs().then((res) => setAllBlogs(res.data));

    socket.on("blog", () => {
      blogService.getAllBlogs().then((res) => setAllBlogs(res.data));
    });
    return () => {
      socket.off("blog");
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      blogService.getPendingPosts().then((res) => setPendingPosts(res.data));

      socket.on("blog", () => {
        blogService.getPendingPosts().then((res) => setPendingPosts(res.data));
      });
      return () => {
        socket.off("blog");
      };
    }
  }, [isLoggedIn]);

  const contextValues = { pendingPosts, allBlogs };
  return (
    <BlogContext.Provider value={contextValues}>
      {children}
    </BlogContext.Provider>
  );
};
