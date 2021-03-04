import React, { useState, useContext } from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import NavLink from "components/navLink/NavLink";
import { AppContext } from "context/AppContext";

import "./Header.scss";

const Header = () => {
  const [activeHeader, setActiveHeader] = useState(false);

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

  return (
    <div className={"app-header-container"}>
      <div
        className={activeHeader ? "activHeader" : "app-header-container__block"}
      >
        <NavLink className="app-header-container__block__logo" to="/"></NavLink>
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
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
