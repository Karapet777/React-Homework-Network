import React from "react";
import PropTypes from "prop-types";

const Button = ({ className = "", onClick, title, disabled = false }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {title}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
export default Button;
