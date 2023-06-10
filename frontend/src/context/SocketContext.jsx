import io from "socket.io-client";

import { createContext } from "react";
import { serverUrl } from "./../utils/utils";
const socket = io(`${serverUrl}/`);

export const SocketContext = createContext(socket);
export const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
