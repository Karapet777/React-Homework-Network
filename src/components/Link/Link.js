import React from "react";

import { Link as RouterLink } from "react-router-dom";

import "./Link.scss";

const Link = ({ children, to, className }) => {
  return (
    <div>
      <RouterLink to={to} className={`btn ${className}`}>
        {children}
      </RouterLink>
    </div>
  );
};

export default Link;
