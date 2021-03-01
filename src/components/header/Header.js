import React, { useState } from "react";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import VpnKeyIcon from "@material-ui/icons/VpnKey";

import NavLink from "components/navLink/NavLink";

import "./Header.scss";

const Header = () => {
  const [activeHeader, setActiveHeader] = useState(false);

  const headerHeandler = () => {
    if (window.scrollY > 10) {
      return setActiveHeader(true);
    } else {
      setActiveHeader(false);
    }
  };
  window.addEventListener("scroll", headerHeandler);

  return (
    <div className={"app-header-container"}>
      <div
        className={activeHeader ? "activHeader" : "app-header-container__block"}
      >
        <NavLink className="app-header-container__block__logo" to="/"></NavLink>
        <nav className="app-header-container__nav">
          <ul className="app-header-container__nav__list">
            <li>
              <NavLink to="/product">Product </NavLink>
            </li>
            <li>
              <NavLink to="/todos">Todos</NavLink>
            </li>
            <li>
              <NavLink to="/signUp">{<LockOpenIcon />}</NavLink>
            </li>
            <li>
              <NavLink to="/signIn">{<VpnKeyIcon />}</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
