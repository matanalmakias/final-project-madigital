import axios from "axios";
import { headers, serverUrl } from "./../utils/utils";

const finalLogin = async (email, verfCode) => {
  return await axios.post(
    `${serverUrl}/api/auth/finalLogin/${email}/${verfCode}`,
    {},
    headers
  );
};
const tryLogin = async (email) => {
  return await axios.post(
    `${serverUrl}/api/auth/tryLogin/${email}`,
    {},
    headers
  );
};

const getSelfUser = async () => {
  return await axios.get(`${serverUrl}/api/auth/getSelfUser`, headers);
};

export { tryLogin, finalLogin, getSelfUser };

const authService = { tryLogin, finalLogin, getSelfUser };
export default authService;
