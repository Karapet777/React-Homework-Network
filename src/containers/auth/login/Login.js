import React, { useState, useContext } from "react";

import Button from "components/button/Button";
import Input from "components/input/Input";
import fbService from "api/fbService";
import "containers/auth/login/Login.scss";
import { AppContext } from "context/AppContext";
import { useHistory } from "react-router-dom";

const Login = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [errorLogin, setErrorLogin] = useState(false);
  const [passwordType, setPasswordType] = useState(false);

  const changeHandler = (name, value) => {
    setErrorLogin(false);
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const chengeTypePassword = () => {
    setPasswordType(!passwordType);
  };

  const handlerLogin = async () => {
    try {
      const user = await fbService.login(credentials);
      console.log(user);
      context.dispatch({ type: "SET_USER", payload: { user } });
      localStorage.setItem("user", JSON.stringify(user));
      history.push("/profile");
    } catch (err) {
      setErrorLogin(true);
    }
  };

  return (
    <div className="app-login-container">
      <p className="app-login-container__title-page">Login</p>
      <Input
        className={errorLogin ? "app-login-container--error" : null}
        value={credentials.email}
        onChenge={(e) => changeHandler("email", e.target.value)}
        placeholder="Email"
      />
      <Input
        className={errorLogin ? "app-login-container--error" : null}
        value={credentials.password}
        onChenge={(e) => changeHandler("password", e.target.value)}
        placeholder="Password"
        type={passwordType ? "text" : "password"}
      />
      <p className="app-login-container--errorText">
        {errorLogin && "Profile does not exist"}
      </p>
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
