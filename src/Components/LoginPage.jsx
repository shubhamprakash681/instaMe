import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import "../style/login-page.css";
import { googleLoginHandler } from "../firebase/loginHandler";
const LoginPage = () => {
  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h1>Welcome to InstaMe</h1>
          <br />
          <div className="login-btn google" onClick={googleLoginHandler}>
            <GoogleOutlined /> Sign In With Google
          </div>
          <br /> <br />
          <div className="login-btn facebook">
            <FacebookOutlined /> Sign In With Facebook
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
