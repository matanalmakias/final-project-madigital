import React, { useContext, useEffect, useState } from "react";
import authService from "../../services/auth.service";
import { toast } from "react-toastify";
import { AuthContext } from "./../../context/AuthContext";
import "./style.scss";
const Login = () => {
  const [emailInput, setEmailInput] = useState();
  const [verfCodeInput, setVerfCodeInput] = useState();
  const [showTryLogin, setShowTryLogin] = useState(true);
  const { login } = useContext(AuthContext);

  const tryLoginSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      return;
    }
    authService.tryLogin(emailInput).then((res) => {
      toast(res.data.message);
      setShowTryLogin(false);
    });
  };
  const finalSubmit = async () => {
    const verfInputRegex = /^\d{6}$/;
    if (!verfInputRegex.test(verfCodeInput)) {
      return;
    }
    await authService.finalLogin(emailInput, verfCodeInput).then((res) => {
      const token = res.data.accessToken;
      const email = res.data.email;
      const roles = res.data.roles;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ email, token, roles }));
        login(token);
      }
      return res.data;
    });
  };

  return (
    <div>
      <div className={showTryLogin ? "div_login_form" : "hide_class"}>
        <label className="login_email_label" htmlFor="Email ">
          Email
        </label>
        <input
          name="email"
          type="email"
          onChange={(e) => setEmailInput(e.target.value)}
          required
          className="w-100 form-control"
          placeholder="Enter your email"
        />
        <div className="row"><div className="col">
        <button
          onClick={() => tryLoginSubmit()}
          className="btn5 form_login_btn p-1 mt-1 btn"
        >
          Recive code to your email
        </button></div><div className="col">
        <button className="btn4">Login with exist code</button></div></div>
      </div>
      <div className={showTryLogin ? "hide_class" : ""}>
        <p className="bg-white text-dark p-1">
          The code is sent to your email!
        </p>
        <input
          type="number"
          onChange={(e) => setVerfCodeInput(e.target.value)}
          required
          className="w-100 form-control"
          placeholder="Enter the code from email"
        />
        <button
          onClick={() => finalSubmit()}
          className="btn-light p-1 mt-1 btn"
          type="submit"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
