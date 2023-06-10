import io from "socket.io-client";

import { createContext } from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { SocketContext } from "./SocketContext";
import portfolioService from "../services/portfolio/portfolio";

export const PortfolioContext = createContext({
  portfolioList: [],
  categories: [],
});

export const PortfolioProvider = ({ children }) => {
  const [portfolioList, setPortfolioList] = useState([]);
  const [categories, setCategories] = useState([]);

  const socket = useContext(SocketContext);
  useEffect(() => {
    portfolioService.getCategories().then((res) => setCategories(res.data));
    portfolioService
      .getAllPortfolios()
      .then((res) => setPortfolioList(res.data));

    socket.on("portfolio-update", () => {
      portfolioService
        .getAllPortfolios()
        .then((res) => setPortfolioList(res.data));
    });
    return () => {
      socket.off("portfolio-update");
    };
  }, []);

  const contextValues = {
    portfolioList,
    categories,
  };
  return (
    <PortfolioContext.Provider value={contextValues}>
      {children}
    </PortfolioContext.Provider>
  );
};
