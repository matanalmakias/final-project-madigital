import { useNavigate } from "react-router-dom";
import "./style.css";
import { useContext, useState } from "react";
import CreateApp from "./../../components/services/create-app/CreateApp";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer } from "react-toastify";
import MyCustomerList from "../../components/home/my-customers/MyCustomerList";
import HomePageContent from "../../components/home/home-page-content/HomePageContent";
import ServiceList from "./../../components/home/service-content/ServiceList";
import Portfolio from "../../components/home/portfolio/Portfolio";
import Contact from "../../components/contact/Contact";
import { SiteContentContext } from "./../../context/SiteContentContext";
import ProductList from "../../components/services/ProductList";
import PointList from "../../components/home/points/PointList";
import Blog from "../../components/blog/Blog";
import PortfolioList from "../../components/portfolio/PortfolioList.jsx";
const Home = () => {
  const [showCreateApp, setShowCreateApp] = useState(false);
  const [showAdv, setShowAdv] = useState(false);
  const [showGeneral, setShowGeneral] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
  const nav = useNavigate();
  const { siteContent } = useContext(SiteContentContext);

  const toggleCreateApp = () => {
    setShowCreateApp((state) => !state);
  };
  const toggleAdv = () => {
    setShowAdv((state) => !state);
  };
  const toggleGeneral = () => {
    setShowGeneral((state) => !state);
  };
  return (
    <div className="w-100 p-2 d-flex flex-column">
      <div className=" d-flex flex-column">
        <div className="col w-100 p-2 mb-1">
          <HomePageContent siteContent={siteContent[0]} />
        </div>
        <div className="col w-100  mb-1">
          <ProductList />
          {/* <ServiceList siteContent={siteContent[0]} /> */}
        </div>
        <div className="col ">
          <PointList />
        </div>
        <div className="col ">
          <MyCustomerList />
        </div>
        <div className="col ">
          <PortfolioList />
        </div>
        <div className="col ">
          <Blog />
        </div>
        <div className="col w-100 mb-1 align-items-center d-flex justify-content-center">
          <Contact siteContent={siteContent[0]} />
        </div>
      </div>
      <ToastContainer autoClose={1200} />
    </div>
  );
};

export default Home;
