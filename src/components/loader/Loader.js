import React from "react";

import "./Loader.scss";

const Loader = ({ className }) => {
  return (
    <div className={`lds-roller ${className}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
