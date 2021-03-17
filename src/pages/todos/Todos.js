import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SaveIcon from "@material-ui/icons/Save";

import fbService from "api/fbService";
import Button from "components/button/Button";
import Loader from "components/loader/Loader";
import TodoList from "components/todoList/TodoList";
import acttionTypesTodo from "redux/acttionTypesTodo";
import Input from "components/input/Input";

import "./Todos.scss";

const Todos = (props) => {
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [valueTodo, setValueTodo] = useState("");
  const [isLoade, setIsLoade] = useState(false);
  const limit = 5;

  useEffect(() => {
    if (!props.todo) {
      fbService.getTodos(start, limit).then((data) => {
        props.setTodo(data);
      });
    }
  });

  const getAllTodo = () => {
    fbService.getAllTodos().then((data) => {
      return props.getAllTodos(data);
    });
  };

  const getMore = () => {
    const newStart = start + limit + 1;
    setStart(newStart);
    console.log(newStart);
    fbService.moreTodo(newStart, newStart + limit).then((data) => {
      props.getMoreTodos(data);
      setHasMore(data.length < limit ? false : true);
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
    fbService
      .createTodo({
        title: valueTodo,
        completed: false,
        userId: 1,
      })
      .then((data) => {
        props.create(data);
      });
    initialValueTodo();
  };

  console.log(props.todo);
  return (
    <>
      {!props.todo ? (
        <Loader className="loader" />
      ) : (
        <div className="app-todo-container">
          <div>
            <Button onClick={getAllTodo} title="get all todos" />
          </div>

          <Input
            value={valueTodo}
            onChenge={chengValueHandler}
            placeholder="Create Todo"
          />
          {valueTodo && (
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
          )}
          <div className="app-todo-container__block-todos">
            {props.todo.map((el) => {
              return <TodoList key={el.id} title={el.title} />;
            })}
          </div>
          <div>
            {hasMore && (
              <Button
                onClick={getMore}
                title={isLoade ? "...loadind" : "get More"}
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
  };
};

const mapDispatchToProps = {
  getAllTodos: (data) => ({
    type: acttionTypesTodo.GET_ALL_TODOS,
    payload: { todo: data },
  }),
  setTodo: (data) => ({
    type: acttionTypesTodo.SET_TODOS,
    payload: { todo: data },
  }),
  getMoreTodos: (data) => ({
    type: acttionTypesTodo.GET_MORE_TODOS,
    payload: { todo: data },
  }),
  create: (data) => ({
    type: acttionTypesTodo.CREATE_TODOS,
    payload: { todo: data },
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
