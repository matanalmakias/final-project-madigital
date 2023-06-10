import axios from "axios";
import { headers, serverUrl } from "../../utils/utils";
const addShare = async (id) => {
  return await axios.put(
    `${serverUrl}/api/portfolio/addShare/${id}`,
    {},
    headers
  );
};
const addLike = async (id) => {
  return await axios.put(
    `${serverUrl}/api/portfolio/addLike/${id}`,
    {},
    headers
  );
};
const removeLike = async (id) => {
  return await axios.put(
    `${serverUrl}/api/portfolio/removeLike/${id}`,
    {},
    headers
  );
};
const getCategories = async () => {
  return await axios.get(`${serverUrl}/api/portfolio/getCategories`);
};
const getAllPortfolios = async () => {
  return await axios.get(`${serverUrl}/api/portfolio`);
};
const getPortfolioWithCategory = async (category) => {
  return await axios.get(`${serverUrl}/api/portfolio/${category}`);
};
const portfolioService = {
  getAllPortfolios,
  getPortfolioWithCategory,
  getCategories,
  removeLike,
  addLike,
  addShare,
};
export default portfolioService;
