import { createStore, combineReducers, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import todoReducer from "redux/reducerTodo";
import postReducer from "redux/reducersPost";

const reducers = combineReducers({
  postReducer,
  todoReducer,
});

const initialState = {
  postReducer: {
    Posts: null,
    hesMorePost: true,
  },
  todoReducer: {
    todo: null,
    hesMore: true,
  },
};
const store = createStore(reducers, initialState, applyMiddleware(reduxThunk));

export default store;
