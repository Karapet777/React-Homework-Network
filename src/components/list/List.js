import React from "react";

import "./List.scss";

const List = ({ nameDrink, imgDrink, className = "" }) => {
  return (
    <div className={`list-container ${className}`}>
      <div className="list-container__name">{nameDrink}</div>
      <img className="list-container__img" src={imgDrink} alt="drink img" />
    </div>
  );
};

export default List;
