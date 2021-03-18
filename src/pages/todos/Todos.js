import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";
import SettingsIcon from "@material-ui/icons/Settings";

import fbService from "api/fbService";
import { AppContext } from "context/AppContext";
import Button from "components/button/Button";
import Loader from "components/loader/Loader";
import TodoList from "components/todoList/TodoList";
import Input from "components/input/Input";
import {
  getAllTodos,
  setTodo,
  getMoreTodos,
  create,
  hesMoreHeandler,
} from "actions/todoActions";

import "./Todos.scss";

const Todos = (props) => {
  const [start, setStart] = useState(0);
  const [showSetting, setShowSetting] = useState(false);
  const [valueTodo, setValueTodo] = useState("");
  const [isLoade, setIsLoade] = useState(false);
  const limit = 5;

  const context = useContext(AppContext);

  useEffect(() => {
    if (!props.todo) {
      fbService.TodoService.getTodos(start, limit).then((data) => {
        props.setTodo(data);
      });
    }
  });

  const getAllTodo = () => {
    fbService.TodoService.getAllTodos().then((data) => {
      return props.getAllTodos(data);
    });
    props.hesMoreHeandler(false);
  };

  const deletePost = (id) => {
    fbService.TodoService.deletePost(id)
      .then(() => {
        fbService.TodoService.getTodos(
          0,
          start !== 0 ? start + limit : limit
        ).then((res) => {
          props.setTodo(res);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMore = () => {
    const newStart = start + limit + 1;
    setStart(newStart);
    fbService.TodoService.moreTodo(newStart, newStart + limit).then((data) => {
      props.getMoreTodos(data);
      props.hesMoreHeandler(data.length < limit ? false : true);
    });
    setIsLoade(false);
  };

  const chengValueHandler = (e) => {
    const eventeValues = e.target.value;
    if (eventeValues !== " ") {
      setValueTodo(eventeValues);
    }
  };

  const initialValueTodo = () => {
    setValueTodo("");
  };

  const createTodoHandler = () => {
    fbService.TodoService.createTodo({
      title: valueTodo,
      completed: false,
      userId: 1,
    }).then((data) => {
      props.create(data);
    });
    initialValueTodo();
  };

  const toggleSettings = () => {
    setShowSetting(!showSetting);
  };

  return (
    <>
      {!props.todo ? (
        <Loader className="loader" />
      ) : (
        <div className="app-todo-container">
          <div className="app-todo-container__block-setting">
            <SettingsIcon
              className="app-todo-container__block-setting__icon-setting"
              onClick={toggleSettings}
            />
            {showSetting && (
              <Button onClick={getAllTodo} title="get all todos" />
            )}
          </div>
          {context.state.user && (
            <Input
              value={valueTodo}
              onChenge={chengValueHandler}
              placeholder="Create Todo"
            />
          )}
          {context.state.user && valueTodo ? (
            <div className="app-todo-container__createTodo-block">
              <div className="app-todo-container__createTodo-block__textNewTodo">
                {valueTodo}
                <SaveIcon
                  className="app-todo-container__createTodo-block__icon"
                  onClick={createTodoHandler}
                />
                <span
                  onClick={initialValueTodo}
                  className="app-todo-container__createTodo-block__close"
                >
                  &times;
                </span>
              </div>
            </div>
          ) : null}
          <div className="app-todo-container__block-todos">
            {props.todo.map((el) => {
              return (
                <TodoList
                  key={el.id}
                  title={el.title}
                  onClick={() => deletePost(el.id)}
                  isUser={context.state.user ? true : false}
                />
              );
            })}
          </div>
          <div>
            {props.hesMore && (
              <Button
                onClick={getMore}
                title={isLoade ? "...loading" : "get More"}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    todo: state.todo,
    hesMore: state.hesMore,
  };
};

const mapDispatchToProps = {
  getAllTodos,
  setTodo,
  getMoreTodos,
  create,
  hesMoreHeandler,
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
