import React from "react";

import "./Header.scss";
import NavLink from "components/navLink/NavLink";

const Header = () => {
  return (
    <div className="app-header-container">
      <nav className="app-header-container__nav">
        <ul className="app-header-container__nav__list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product </NavLink>
          </li>
          <li>
            <NavLink to="/todos">Todos</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
