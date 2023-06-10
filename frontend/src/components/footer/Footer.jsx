import "./style.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const nav = useNavigate();
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="my_bg p-2">
      <div className="text-center">
        <p
          className="btn w-100 back_hover p-1 btn3 hover2"
          onClick={() => nav(-1)}
        >
          Back
        </p>
      </div>
      <p className="info_text mb-1">
        Expertly crafted web solutions using the latest technologies: React,
        MongoDB, Mongoose, JS, TS, Node.js, Bootstrap, and HTML by Madigital.
      </p>
      <p className="copyright_text">
        Copyright reserved to Madigital.co.il @ {year}
      </p>
    </div>
  );
};

export default Footer;
