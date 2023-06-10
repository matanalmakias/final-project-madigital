import { useContext } from "react";
import { SiteContentContext } from "../../../context/SiteContentContext";
import "./style.scss";
const PointList = () => {
  const { siteContent } = useContext(SiteContentContext);
  const randomIndex = Math.floor(Math.random() * 6);
  const randomItem = siteContent[0]?.points?.[randomIndex];
  return (
    <div className="row gap-2 p-1 rounded shadow">
      <PointItem key={randomIndex} item={randomItem} />
    </div>
  );
};
const PointItem = ({ item }) => {
  return <p className=" p1 p-3 mt-1 fs2 background2 rounded">{item}</p>;
};
export default PointList;
