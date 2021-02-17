import React from "react";

const Button = ({ className, onClick, title }) => {
  return (
    <button onClick={onClick} className={className}>
      {title}
    </button>
  );
};

export default Button;
