import React from "react";
import PropTypes from "prop-types";

import "components/input/Input.scss";

const Input = ({
  value,
  onChenge,
  type = "text",
  className = "",
  loading = false,
  placeholder = "",
  onKeyDown,
}) => {
  return (
    <input
      className={`app-input  ${className}`}
      value={value}
      onChange={onChenge}
      type={type}
      disabled={loading}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChenge: PropTypes.func.isRequired,
  className: PropTypes.string,
  loading: PropTypes.bool,
  placeholder: PropTypes.string,
  onKeyDown: PropTypes.func,
};

export default Input;
