import React, { useState } from "react";

import Login from "./login/Login";
import Signup from "./signup/Signup";
import Button from "components/button/Button";

import "containers/auth/Auth.scss";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleChengePage = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="app-auth-container">
      {isLogin ? <Login /> : <Signup />}
      <Button
        className="app-auth-container__btn"
        onClick={toggleChengePage}
        title={isLogin ? "Don't have an account? ?" : "Go to Login ?"}
      />
    </div>
  );
};

export default Auth;
