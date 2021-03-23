import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";

import fbService from "api/fbService";
import { AppContext } from "context/AppContext";
import Button from "components/button/Button";
import Loader from "components/loader/Loader";
import TodoList from "components/todoList/TodoList";
import Input from "components/input/Input";
import SettingsIcon from "components/SettingsIcon/SettingsIcon";
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
  const limit = 7;

  const context = useContext(AppContext);

  useEffect(() => {
    if (!props.todo) {
      props.setTodo(start, limit);
    }
    //eslint-disable-next-line
  }, []);

  const getAllTodo = () => {
    props.getAllTodos();
    props.hesMoreHeandler(false);
  };

  const deletePost = (id) => {
    fbService.TodoService.deletePost(id)
      .then(() => {
        props.getAllTodos();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMore = () => {
    setIsLoade(true);
    const newStart = start + limit + 1;
    setStart(newStart);
    props.getMoreTodos(start, limit);
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
    });
    fbService.TodoService.getAllTodos().then((res) => {
      props.getAllTodos(res);
    });
    initialValueTodo();
    props.hesMoreHeandler(false);
  };

  const toggleSettings = () => {
    setShowSetting(!showSetting);
  };

  const doneHandler = (id) => {
    fbService.TodoService.readPost(id, { completed: true }).then((res) => {
      fbService.TodoService.getAllTodos().then((res) => {
        props.getAllTodos(res);
        props.hesMoreHeandler(false);
      });
    });
  };

  const notDoneHandler = (id) => {
    fbService.TodoService.readPost(id, { completed: false }).then((res) => {
      fbService.TodoService.getAllTodos().then((res) => {
        props.getAllTodos(res);
        props.hesMoreHeandler(false);
      });
    });
  };

  const keyEnterHandler = (e) => {
    if (e.keyCode === 13) {
      createTodoHandler();
    }
  };

  return (
    <>
      {!props.todo || isLoade ? (
        <Loader className="loader" />
      ) : (
        <div className="app-todo-container">
          {context.state.user && (
            <div className="app-todo-container__block-setting">
              <SettingsIcon onClick={toggleSettings} />
              {showSetting && (
                <Button
                  className="app-todo-container__btns"
                  onClick={getAllTodo}
                  title="get all todos"
                />
              )}
            </div>
          )}
          {context.state.user && (
            <Input
              value={valueTodo}
              onChenge={chengValueHandler}
              placeholder="Create Todo"
              onKeyDown={keyEnterHandler}
            />
          )}
          {context.state.user && valueTodo ? (
            <div className="app-todo-container__createTodo-block">
              <div className="app-todo-container__createTodo-block__textNewTodo">
                {valueTodo}
                <span
                  onClick={initialValueTodo}
                  className="app-todo-container__createTodo-block__close"
                >
                  &times;
                </span>
              </div>
              <SaveIcon
                className="app-todo-container__createTodo-block__icon-set"
                onClick={createTodoHandler}
              />
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
                  onClickDone={() => doneHandler(el.id)}
                  onClickNotDone={() => notDoneHandler(el.id)}
                  className={props.todo[el.id].completed && "done"}
                />
              );
            })}
          </div>
          <div>
            {props.hesMore && (
              <Button
                className="app-todo-container__btns"
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
    todo: state.todoReducer.todo,
    hesMore: state.todoReducer.hesMore,
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
