import React, { useState, useContext } from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuIcon from "@material-ui/icons/Menu";

import NavLink from "components/navLink/NavLink";
import { AppContext } from "context/AppContext";
import { useHistory } from "react-router-dom";
import fbService from "api/fbService";
import { actionTypes } from "context/actionTypes";

import "./Header.scss";

const Header = () => {
  const [activeHeader, setActiveHeader] = useState(false);
  const [toggleBurger, setToggleBurger] = useState(false);
  const history = useHistory();
  const context = useContext(AppContext);

  const headerHeandler = () => {
    if (window.scrollY > 10) {
      return setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  };

  window.addEventListener("scroll", headerHeandler);

  const headerLinks = [
    { to: "/product", title: "Product" },
    { to: "/todos", title: "Todos" },
  ];

  const removeUser = async () => {
    await fbService.UserService.logout();
    localStorage.removeItem("user");
    context.dispatch({ type: actionTypes.REMOVE_USER });
    history.push("./auth");
    setToggleBurger(!toggleBurger);
  };

  const toggleBurgerMenu = () => {
    setToggleBurger(!toggleBurger);
  };

  const closeBurgerMenu = () => {
    setToggleBurger(false);
  };
  return (
    <div className="app-header-container">
      <div className={"app-header-container__block"}>
        <NavLink
          onClick={closeBurgerMenu}
          className={
            activeHeader ? "activHeader" : "app-header-container__block__logo"
          }
          to="/"
        ></NavLink>
        <span className="burger">
          <MenuIcon onClick={toggleBurgerMenu} />
        </span>

        <nav className="app-header-container__nav">
          <ul className="app-header-container__nav__list">
            {headerLinks.map((el) => (
              <li key={el.to}>
                <NavLink to={el.to}>{el.title}</NavLink>
              </li>
            ))}
            <li>
              {!context.state.user ? (
                <NavLink to={"/auth"}>
                  <VpnKeyIcon />
                </NavLink>
              ) : (
                <NavLink to={"/profile"}>Profile</NavLink>
              )}
            </li>
            {context.state.user && (
              <li>
                <ExitToAppIcon
                  onClick={removeUser}
                  className="app-header-container__logOute"
                />
              </li>
            )}
          </ul>
        </nav>
      </div>
      {/* burger */}
      {toggleBurger ? (
        <nav className="app-header-container__burger-menu">
          <ul className="app-header-container__burger-menu__list">
            {headerLinks.map((el) => (
              <li onClick={toggleBurgerMenu} key={el.to}>
                <NavLink to={el.to}>{el.title}</NavLink>
              </li>
            ))}
            <li>
              {!context.state.user ? (
                <NavLink onClick={toggleBurgerMenu} to={"/auth"}>
                  <VpnKeyIcon />
                </NavLink>
              ) : (
                <NavLink onClick={toggleBurgerMenu} to={"/profile"}>
                  Profile
                </NavLink>
              )}
            </li>
            {context.state.user && (
              <ExitToAppIcon
                onClick={removeUser}
                className="app-header-container__logOute"
              />
            )}
          </ul>
        </nav>
      ) : null}
    </div>
  );
};

export default Header;
