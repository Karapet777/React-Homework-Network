import React from "react";
import PropTypes from "prop-types";
import DeleteIcon from "@material-ui/icons/Delete";

import "./TodoList.scss";
import Button from "components/button/Button";

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
              title="done"
              className="todoList-container__checkbox__btn"
            />
            <Button
              onClick={onClickNotDone}
              title="not done"
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
};

export default TodoList;
