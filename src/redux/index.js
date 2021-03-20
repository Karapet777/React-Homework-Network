import { createStore, combineReducers } from "redux";
import todoReducer from "redux/reducerTodo";
import postReducer from "redux/reducersPost";

const reducers = combineReducers({
  postReducer,
  todoReducer,
});

const store = createStore(reducers);

export default store;
