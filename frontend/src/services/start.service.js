import axios from "axios";
import { headers, serverUrl } from "./../utils/utils";

const createApp = async (body) => {
  return await axios.post(`${serverUrl}/api/firstStep/createApp`, body, headers);
};

export { createApp };

const startService = { createApp };
export default startService;
