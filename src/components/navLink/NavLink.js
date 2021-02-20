import React from "react";
import { NavLink as HeaderLink } from "react-router-dom";

import "./NavLink.scss";

const NavLink = ({ children, to, className }) => {
  return (
    <div>
      <HeaderLink
        exact
        activeClassName="navLink--active"
        className={`navLink ${className}`}
        to={to}
      >
        {children}
      </HeaderLink>
    </div>
  );
};

export default NavLink;
