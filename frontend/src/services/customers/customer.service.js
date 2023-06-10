import axios from "axios";
import { headers, serverUrl } from "./../../utils/utils";
const removeCustomer = async (customerId) => {
  return await axios.delete(
    `${serverUrl}/api/customer/removeCustomer/${customerId}`,
    headers
  );
};
const updateCustomer = async (body, customerId) => {
  return await axios.put(
    `${serverUrl}/api/customer/updateCustomer/${customerId}`,
    body,
    headers
  );
};
const createCustomer = async (body) => {
  return await axios.post(
    `${serverUrl}/api/customer/createCustomer`,
    body,
    headers
  );
};

const customerService = { createCustomer, updateCustomer, removeCustomer };
export default customerService;
