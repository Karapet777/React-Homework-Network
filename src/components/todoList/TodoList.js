import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import Input from "components/input/Input";

import "./TodoList.scss";

const TodoList = ({ title, onClick = () => {}, onChenge = () => {} }) => {
  return (
    <div className="todoList-container">
      <Input type="checkbox" onChenge={onChenge} />
      <p className="todoList-container__title">{title}</p>
      <DeleteIcon
        className="todoList-container__remov-icon"
        onClick={onClick}
      />
    </div>
  );
};
TodoList.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChenge: PropTypes.func,
};
export default TodoList;
