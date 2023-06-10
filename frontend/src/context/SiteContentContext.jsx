import io from "socket.io-client";

import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import siteContentService from "./../services/site-content/site-content";
import { serverUrl } from "./../utils/utils";
const socket = io(`${serverUrl}`);

const SocketContext = createContext(socket);
export const SiteContentContext = createContext({
  siteContent: [],
  customerList: [],
  socketUpdate: () => {},
});

export const SiteContentProvider = ({ children }) => {
  const [siteContent, setSiteContent] = useState([]);
  const [customerList, setCustomerList] = useState([]);

  const socket = useContext(SocketContext);
  useEffect(() => {
    siteContentService.getSiteContent().then((res) => setSiteContent(res.data));
    siteContentService
      .getCustomerList()
      .then((res) => setCustomerList(res.data));
    socket.on("siteContent", () => {
      siteContentService
        .getSiteContent()
        .then((res) => setSiteContent(res.data));
      siteContentService
        .getCustomerList()
        .then((res) => setCustomerList(res.data));
    });
    return () => {
      socket.off("siteContent");
    };
  }, []);
  const socketUpdate = () => {
    return socket.emit("update");
  };
  const contextValues = {
    customerList,
    siteContent,
    socketUpdate,
  };
  return (
    <SiteContentContext.Provider value={contextValues}>
      {children}
    </SiteContentContext.Provider>
  );
};
