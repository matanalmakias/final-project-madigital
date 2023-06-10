import axios from "axios";
import { headers, serverUrl } from "./../../utils/utils";
const contactRequest = async (body) => {
  return await axios.post(
    `${serverUrl}/api/profile/generalContact`,
    body,
    headers
  );
};
const submitPhone = async (phone, verfCode) => {
  return await axios.put(
    `${serverUrl}/api/profile/submitPhone/${phone}/${verfCode}`,
    {},
    headers
  );
};
const submitEmail = async (email, verfCode) => {
  return await axios.put(
    `${serverUrl}/api/profile/submitEmail/${email}/${verfCode}`,
    {},
    headers
  );
};
const editField = async (sign, body) => {
  return await axios.put(
    `${serverUrl}/api/profile/editField/${sign}`,
    body,
    headers
  );
};
const finishDetails = async (body) => {
  return await axios.post(
    `${serverUrl}/api/profile/finishDetails`,
    body,
    headers
  );
};
const profileService = {
  contactRequest,
  finishDetails,
  editField,
  submitPhone,
  submitEmail,
};
export default profileService;
