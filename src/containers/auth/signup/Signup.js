import React, { useState, useContext } from "react";

import fbService from "api/fbService";
import Input from "components/input/Input";
import Button from "components/button/Button";
import { AppContext } from "context/AppContext";

import "containers/auth/signup/Signup.scss";

const Signup = () => {
  const context = useContext(AppContext);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [passwordType, setpasswordType] = useState(false);

  const [error, setError] = useState({
    errorEmail: "",
    errorPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = (name, value) => {
    setError({
      errorEmail: "",
      errorPassword: "",
    });
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const chengeTypePassword = () => {
    setpasswordType(!passwordType);
  };

  const handlerSignup = async () => {
    try {
      setLoading(true);
      const user = await fbService.signup(credentials);
      console.log(user);
      context.dispatch({ type: "SET_USER", payload: { user } });
    } catch (err) {
      console.log(err);
      if (err.code === "auth/invalid-email") {
        setError({
          errorEmail: err.message,
        });
      } else if (err.code === "auth/weak-password") {
        setError({
          errorPassword: err.message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-signup-container">
      <p className="app-signup-container__title-page">Signup</p>
      <Input
        className={error.errorEmail ? "app-signup-container--errorClass" : null}
        value={credentials.email}
        placeholder="Email"
        onChenge={(e) => changeHandler("email", e.target.value)}
        loading={loading}
      />
      <p className="app-signup-container__errorText">{error.errorEmail}</p>
      <Input
        className={
          error.errorPassword ? "app-signup-container--errorClass" : null
        }
        value={credentials.password}
        placeholder="Password"
        onChenge={(e) => changeHandler("password", e.target.value)}
        type={passwordType ? "text" : "password"}
        loading={loading}
      />
      <p className="app-signup-container__errorText">{error.errorPassword}</p>

      <span className="app-signup-container__checkbox">
        <input type="checkbox" onChange={chengeTypePassword} />
        &nbsp; <span>show password</span>
      </span>
      <Button
        className="app-signup-container__btn"
        title={loading ? "loading..." : "Signup"}
        onClick={handlerSignup}
        disabled={loading}
      />
    </div>
  );
};

export default Signup;
