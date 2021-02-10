import React from "react";
import PropType from "prop-types";

import "./Item.scss";

const Item = ({ color }) => (
  <div className="contaoner-item-color">
    <p>{color.title}</p>
    <img src={color.url} alt="color" />
  </div>
);

Item.propType = {
  title: PropType.string,
  url: PropType.string,
  id: PropType.number,
};

export default Item;
