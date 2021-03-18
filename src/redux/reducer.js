import initialState from "redux/todoState";
import acttionTypesTodo from "redux/acttionTypesTodo";

const reducer = (state = initialState, action) => {
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
    case acttionTypesTodo.HES_MORE:
      return {
        ...state,
        hesMore: action.payload.hesMore,
      };
    default:
      return state;
  }
};

export default reducer;
