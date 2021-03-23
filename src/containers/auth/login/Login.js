import React, { useState, useContext } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";

import Button from "components/button/Button";
import Input from "components/input/Input";
import fbService from "api/fbService";
import { AppContext } from "context/AppContext";
import { useHistory } from "react-router-dom";

import "containers/auth/login/Login.scss";

const Login = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [errorLogin, setErrorLogin] = useState(false);
  const [passwordType, setPasswordType] = useState(false);
  const [isRememberPassword, setIsRememberPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const chengeHandler = (name, value) => {
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
      const user = await fbService.UserService.login(credentials);
      context.dispatch({ type: "SET_USER", payload: { user } });
      if (isRememberPassword) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setCredentials({
        ...credentials,
        name: user.displayName,
      });
      history.push("/profile");
    } catch (err) {
      setErrorLogin(true);
    }
  };

  const rememberToggle = () => {
    setIsRememberPassword(!isRememberPassword);
  };

  const keydownHandler = (e) => {
    if (e.keyCode === 13) {
      handlerLogin();
    }
  };

  return (
    <div className="app-login-container">
      <div className="app-login-container__block">
        {passwordType ? (
          <VisibilityIcon
            onClick={chengeTypePassword}
            className="app-login-container__block__VisibilityIcon"
          />
        ) : (
          <VisibilityOffIcon
            onClick={chengeTypePassword}
            className="app-login-container__block__VisibilityIcon"
          />
        )}
        <AlternateEmailIcon className="app-login-container__block__AlternateEmailIcon" />
        <p className="app-login-container__title-page">Login</p>
        <Input
          className={errorLogin ? "app-login-container--error" : null}
          value={credentials.email}
          onChenge={(e) => chengeHandler("email", e.target.value)}
          placeholder="Email"
          onKeyDown={keydownHandler}
        />
        <Input
          className={errorLogin ? "app-login-container--error" : null}
          value={credentials.password}
          onChenge={(e) => chengeHandler("password", e.target.value)}
          placeholder="Password"
          onKeyDown={keydownHandler}
          type={passwordType ? "text" : "password"}
        />
        <p className="app-login-container--errorText">
          {errorLogin && "Profile does not exist"}
        </p>
        <div className="app-signup-container__block__Forgot-Password-Block">
          <Input
            onChenge={rememberToggle}
            className="app-signup-container__block__Forgot-Password-Block__checkbox"
            type="checkbox"
          />
          <p>Remember me</p>
        </div>
        <Button
          className="app-login-container__btn"
          title="Login"
          onClick={handlerLogin}
        />
      </div>
    </div>
  );
};

export default Login;
