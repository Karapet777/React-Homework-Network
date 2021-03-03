import React, { useState } from "react";

import fbService from "api/fbService";
import Input from "components/input/Input";
import Button from "components/button/Button";

import "containers/auth/signup/Signup.scss";
const Signup = () => {
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

  const handlerSignup = async () => {
    const user = await fbService.signup(credentials);
    console.log(user);
  };
  return (
    <div className="app-login-container">
      <p className="app-login-container__title-page">Signup</p>
      <Input
        value={credentials.email}
        placeholder="Email"
        onChenge={(e) => changeHandler("email", e.target.value)}
      />
      <Input
        value={credentials.password}
        placeholder="Password"
        onChenge={(e) => changeHandler("password", e.target.value)}
        type={credentials.passwordType ? "text" : "password"}
      />
      <span className="app-login-container__checkbox">
        <input type="checkbox" onChange={chengeTypePassword} />
        &nbsp; <span>show password</span>
      </span>
      <Button
        className="app-login-container__btn"
        title="Signup"
        onClick={handlerSignup}
      />
    </div>
  );
};

export default Signup;
