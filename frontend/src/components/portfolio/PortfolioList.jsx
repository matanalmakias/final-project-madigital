import React, { useContext, useEffect, useState } from "react";
import { PortfolioContext } from "../../context/PortfolioContext";
import PortfolioItem from "./PortfolioItem";
import "./style.scss";
const PortfolioList = () => {
  const { portfolioList, categories } = useContext(PortfolioContext);
  const [list, setList] = useState(portfolioList);

  const [visibleItems, setVisibleItems] = useState(15);
  useEffect(() => {
    setList(portfolioList);
  }, [portfolioList]);
  const handleShowMore = () => {
    setVisibleItems((prevVisibleItems) => prevVisibleItems + 15);
  };

  const handleShowLess = () => {
    setVisibleItems(20);
  };

  return (
    <div className="row p-3 bg-dark">
      <h3 className="h2 text-white text-center ">Portfolio</h3>
      <div className="row gap-1">
        <h4 className="h5  text-white">Categories</h4>
        {categories?.map((item, index) => {
          const filterCategory = () => {
            const filteredPortfolioList = portfolioList.filter(
              (portfolioItem) => item === portfolioItem.category
            );
            setList(filteredPortfolioList);
          };

          return (
            <div
              onClick={() => filterCategory()}
              className="col card cursor text-center "
              key={index}
            >
              <p className="mb-1 fs-4 text-black">{item}</p>
            </div>
          );
        })}
      </div>
      {list.slice(0, visibleItems).map((item, index) => (
        <div key={item._id} className="w_20">
          <PortfolioItem item={item} />
        </div>
      ))}
      {visibleItems < portfolioList.length ? (
        <div className="w_100 text-center">
          <button className="show-button" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      ) : (
        <div className="w_100 text-center">
          <button className="show-button" onClick={handleShowLess}>
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
