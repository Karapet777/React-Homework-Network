import React, { useState, useContext } from "react";

import fbService from "api/fbService";
import Input from "components/input/Input";
import Button from "components/button/Button";
import { AppContext } from "context/AppContext";
import { validateEmail, validatePassword } from "utils/validate";

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
    profileMatch: false,
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
    if (!validateEmail(credentials.email)) {
      return setError({
        errorEmail: "The email address is badly formatted.",
      });
    } else if (!validatePassword(credentials.password)) {
      setError({
        errorPassword: "Password should be at least 6 characters",
      });
    } else {
      try {
        setLoading(true);
        const user = await fbService.signup(credentials);
        console.log(user);
        context.dispatch({ type: "SET_USER", payload: { user } });
        setCredentials({
          email: "",
          password: "",
        });
      } catch (err) {
        if (err.code === "auth/email-already-in-use") {
          return setError({
            profileMatch: true,
          });
        }
      } finally {
        setLoading(false);
      }
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

      <p className="app-signup-container__errorText">
        {error.profileMatch &&
          "The email address is already in use by another account."}
      </p>

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
