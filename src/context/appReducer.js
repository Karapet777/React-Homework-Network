import { actionTypes } from "context/actionTypes";

const appReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    case actionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
      };
    case actionTypes.SET_POSTS:
      return {
        ...state,
        Posts: action.payload.Posts,
      };
    case actionTypes.GET_MORE_POSTS:
      return {
        ...state,
        Posts: [...state.Posts, ...action.payload.Posts],
      };
    case actionTypes.UPDATE_POSTS:
      return {
        ...state,
        Posts: state.Posts.map((el) => {
          if (el.id === action.payload.post.id) {
            return action.payload.post;
          }
          return el;
        }),
      };
    case actionTypes.CREATE_POSTS:
      return {
        ...state,
        Posts: [...state.Posts, action.payload.post],
      };
    case actionTypes.GET_ALL_POSTS:
      return {
        ...state,
        Posts: action.payload.posts,
      };
    case actionTypes.HES_MORE:
      return {
        ...state,
        hesMore: action.payload.hesMore,
      };
    default:
      return state;
  }
};
export default appReducer;
