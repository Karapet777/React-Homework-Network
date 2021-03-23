import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";

import "./TodoList.scss";

const TodoList = ({
  title,
  onClick = () => {},
  onClickDone = () => {},
  onClickNotDone = () => {},
  isUser = false,
  className,
}) => {
  const wrapper = () => {
    if (isUser) {
      return (
        <div className={`todoList-container ${className}`}>
          <div className="todoList-container__checkbox">
            <CheckBoxIcon
              className="todoList-container__checkbox__btn-done"
              onClick={onClickDone}
            />
            <IndeterminateCheckBoxIcon
              className="todoList-container__checkbox__btn-notDoneIcon"
              onClick={onClickNotDone}
            />
          </div>
          <p className="todoList-container__title">{title}</p>
          <DeleteIcon
            className="todoList-container__remov-icon"
            onClick={onClick}
          />
        </div>
      );
    } else {
      return (
        <div className="todoList-container">
          <p className="todoList-container__title">{title}</p>
        </div>
      );
    }
  };

  return wrapper();
};

TodoList.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChenge: PropTypes.func,
  onClickDone: PropTypes.func,
  onClickNotDone: PropTypes.func,
  isUser: PropTypes.bool,
};

export default TodoList;
