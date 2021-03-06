import acttionTypesTodo from "redux/actionTypesTodo";
import fbService from "api/fbService";

export const getAllTodos = () => (dispatch) => {
  fbService.TodoService.getAllTodos().then((data) => {
    dispatch({
      type: acttionTypesTodo.GET_ALL_TODOS,
      payload: { todo: data },
    });
  });
};

export const setTodo = (start, limit) => (dispatch) => {
  fbService.TodoService.getTodos(start, limit).then((data) => {
    dispatch({
      type: acttionTypesTodo.SET_TODOS,
      payload: { todo: data },
    });
  });
};

export const getMoreTodos = (newStart, limit) => (dispatch) => {
  fbService.TodoService.getTodos(newStart, newStart + limit).then((data) => {
    dispatch({
      type: acttionTypesTodo.GET_MORE_TODOS,
      payload: { todo: data },
    });
    dispatch({
      type: acttionTypesTodo.HES_MORE_TODO,
      payload: { hesMore: data.length <= limit ? false : true },
    });
    console.log(data.length);
  });
};

export const create = (data) => ({
  type: acttionTypesTodo.CREATE_TODOS,
  payload: { todo: data },
});

export const hesMoreHeandler = (hesMore) => ({
  type: acttionTypesTodo.HES_MORE_TODO,
  payload: { hesMore: hesMore },
});

export const updateTodo = (res) => ({
  type: acttionTypesTodo.UPDATE_TODO,
  payload: { todo: res },
});
