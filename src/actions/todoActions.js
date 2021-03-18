import acttionTypesTodo from "redux/acttionTypesTodo";

export const getAllTodos = (data) => ({
  type: acttionTypesTodo.GET_ALL_TODOS,
  payload: { todo: data },
});

export const setTodo = (data) => ({
  type: acttionTypesTodo.SET_TODOS,
  payload: { todo: data },
});

export const getMoreTodos = (data) => ({
  type: acttionTypesTodo.GET_MORE_TODOS,
  payload: { todo: data },
});

export const create = (data) => ({
  type: acttionTypesTodo.CREATE_TODOS,
  payload: { todo: data },
});

export const hesMoreHeandler = (hesMore) => ({
  type: acttionTypesTodo.HES_MORE,
  payload: { hesMore },
});
