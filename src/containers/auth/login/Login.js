import React, { useState } from "react";

import Button from "components/button/Button";
import Input from "components/input/Input";
import fbService from "api/fbService";
import "containers/auth/login/Login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordType: false,
  });

  const changeHandler = (name, value) => {
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const chengeTypePassword = () => {
    setCredentials({
      ...credentials,
      passwordType: !credentials.passwordType,
    });
  };

  const handlerLogin = async () => {
    const user = await fbService.login(credentials);
    console.log(user);
  };
  return (
    <div className="app-login-container">
      <p className="app-login-container__title-page">Login</p>
      <Input
        value={credentials.email}
        onChenge={(e) => changeHandler("email", e.target.value)}
        placeholder="Email"
      />
      <Input
        value={credentials.password}
        onChenge={(e) => changeHandler("password", e.target.value)}
        placeholder="Password"
        type={credentials.passwordType ? "text" : "password"}
      />
      <span className="app-login-container__checkbox">
        <input type="checkbox" onChange={chengeTypePassword} />
        &nbsp; <span>show password</span>
      </span>
      <Button
        className="app-login-container__btn"
        title="Login"
        onClick={handlerLogin}
      />
    </div>
  );
};

export default Login;
