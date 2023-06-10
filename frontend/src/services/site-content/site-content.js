import axios from "axios";
import { headers, serverUrl } from "../../utils/utils";
const updatePoint = async (body, index, contentId) => {
  return await axios.put(
    `${serverUrl}/api/site-content/updatePoint/${index}/${contentId}`,
    body,
    headers
  );
};
const updateContent = async (body, contentId, param) => {
  return await axios.put(
    `${serverUrl}/api/site-content/updateContent/${contentId}/${param}`,
    body,
    headers
  );
};
const createNewSiteContent = async (body) => {
  return await axios.post(
    `${serverUrl}/api/site-content/createNewSiteContent`,
    body,
    headers
  );
};
const getSiteContent = async () => {
  return await axios.get(`${serverUrl}/api/site-content`);
};
const getCustomerList = async () => {
  return await axios.get(`${serverUrl}/api/customer`);
};

const siteContentService = {
  getSiteContent,
  createNewSiteContent,
  getCustomerList,
  updateContent,
  updatePoint,
};
export default siteContentService;
