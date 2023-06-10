import axios from "axios";
import { headers, serverUrl } from "../../utils/utils";

const removePost = async (postId) => {
  return await axios.delete(
    `${serverUrl}/api/blog/removePost/${postId}`,
    headers
  );
};
const userAddPost = async (body) => {
  return await axios.post(`${serverUrl}/api/blog/userAddPost`, body, headers);
};
const addPost = async (body) => {
  return await axios.post(`${serverUrl}/api/blog/addPost`, body, headers);
};
const adminConfirm = async (postId, sign) => {
  return await axios.put(
    `${serverUrl}/api/blog/adminConfirm/${postId}/${sign}`,
    {},
    headers
  );
};

const getAllBlogs = async () => {
  return await axios.get(`${serverUrl}/api/blog/`);
};
const addLike = async (postId) => {
  return await axios.put(
    `${serverUrl}/api/blog/addLike/${postId}`,
    {},
    headers
  );
};
const removeLike = async (postId) => {
  return await axios.delete(
    `${serverUrl}/api/blog/removeLike/${postId}`,

    headers
  );
};

const getPendingPosts = async () => {
  return axios.get(`${serverUrl}/api/blog/getPendingPosts`, headers);
};

const editField = async (postId, sign, body) => {
  return await axios.put(
    `${serverUrl}/api/blog/editField/${postId}/${sign}`,
    body,
    headers
  );
};
const blogService = {
  getAllBlogs,
  addPost,
  addLike,
  userAddPost,
  removeLike,
  editField,
  adminConfirm,
  getPendingPosts,
  removePost,
};
export default blogService;
