import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import { Dropdown, DropdownButton } from "react-bootstrap";
const UserNav = () => {
  const nav = useNavigate();
  const { logout, isLoggedIn } = useContext(AuthContext);

  return (
    <div className="w-100 text-center row ">
      <div className="col">
        <p onClick={() => nav(`/user/profile`)} className=" login_button">
          My account
        </p>
      </div>
      <div className="col">
        <p onClick={() => logout()} className=" login_button">
          Logout
        </p>
      </div>
      <div className="col">
        <p onClick={() => nav("/blog")} className=" login_button">
          Blog
        </p>
      </div>
      <div className="col">
        <p onClick={() => nav("/user/products")} className=" login_button">
          My products
        </p>
      </div>
    </div>
  );
};

export default UserNav;
