import React, { useContext, useState } from "react";
import logo from "../../assets/logo.png";
import "./style.css";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import Login from "../login/Login";
import { useNavigate } from "react-router-dom";
import UserNav from "./nav-bar/user-nav/UserNav";
import { Container, Row } from "react-bootstrap";
import Navbar from "./nav-bar/Navbar";
const Header = () => {
  const nav = useNavigate();

  return (
    <Container
      fluid
      className="header1 mb-2 text-center d-flex flex-column align-items-center justify-content-center text-center"
    >
      <img
        onClick={() => nav("/")}
        className="mr-3 my_logo "
        style={{ width: `25%` }}
        src={logo}
        alt=""
      />
      <Navbar />
      <ToastContainer autoClose={1000} />
    </Container>
  );
};

export default Header;
