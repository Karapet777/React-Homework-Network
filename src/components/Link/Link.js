import React from "react";
import PropTypes from "prop-types";

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
Link.propTypes = {
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default Link;
