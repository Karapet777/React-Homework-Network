import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "components/button/Button";

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
            <Button
              onClick={onClickDone}
              title="&#9989;"
              className="todoList-container__checkbox__btn"
            />
            <Button
              onClick={onClickNotDone}
              title="&#9940;"
              className="todoList-container__checkbox__btn"
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
