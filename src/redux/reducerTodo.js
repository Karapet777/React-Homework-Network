import acttionTypesTodo from "redux/actionTypesTodo";

const initialState = {
  todo: null,
  hesMore: true,
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case acttionTypesTodo.GET_ALL_TODOS:
      return {
        ...state,
        todo: action.payload.todo,
      };
    case acttionTypesTodo.SET_TODOS:
      return {
        ...state,
        todo: action.payload.todo,
      };
    case acttionTypesTodo.GET_MORE_TODOS:
      return {
        ...state,
        todo: [...state.todo, ...action.payload.todo],
      };
    case acttionTypesTodo.CREATE_TODOS:
      return {
        ...state,
        todo: [...state.todo, action.payload.todo],
      };
    case acttionTypesTodo.HES_MORE_TODO:
      return {
        ...state,
        hesMore: action.payload.hesMore,
      };
    default:
      return state;
  }
};

export default todoReducer;
