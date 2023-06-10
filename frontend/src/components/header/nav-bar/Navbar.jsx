import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import UserNav from "./user-nav/UserNav";
import Login from "../../login/Login";
import { Col, NavLink, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);

  const { isLoggedIn, isManager } = useContext(AuthContext);
  const toggleShowLogin = () => {
    setShowLogin((state) => !state);
  };
  const nav = useNavigate();
  return (
    <div className="w-100 text-center">
      {isLoggedIn ? (
        <div className="w-100 text-center">
          <UserNav />
          {isManager && (
            <NavLink onClick={() => nav("/manager")} className="nav-link1 mb-1">
              Manager
            </NavLink>
          )}
        </div>
      ) : (
        <>
          <p onClick={() => toggleShowLogin()} className=" mb-1 login_button">
            Login
          </p>
          <div className={showLogin ? "" : "hide_class"}>
            <Login />
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
