import React from "react";

const Button = ({ className, onClick, title, disabled = false }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={className}>
      {title}
    </button>
  );
};

export default Button;
