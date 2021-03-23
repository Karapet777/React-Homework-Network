import actionTypesPost from "redux/actionTypesPost";

const initialState = {
  Posts: null,
  hesMorePost: true,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypesPost.SET_POSTS:
      return {
        ...state,
        Posts: action.payload.Posts,
      };
    case actionTypesPost.GET_MORE_POSTS:
      return {
        ...state,
        Posts: [...state.Posts, ...action.payload.Posts],
      };
    case actionTypesPost.CREATE_POSTS:
      return {
        ...state,
        Posts: [...state.Posts, action.payload.Posts],
      };
    case actionTypesPost.GET_ALL_POSTS:
      return {
        ...state,
        Posts: action.payload.Posts,
      };
    case actionTypesPost.HES_MORE_POST:
      return {
        ...state,
        hesMorePost: action.payload.hesMorePost,
      };
    case actionTypesPost.UPDATE_POST:
      return {
        ...state,
        Posts: state.Posts.map((el) => {
          if (el.id === action.payload.post.id) {
            return action.payload.post;
          }
          return el;
        }),
      };
    default:
      return state;
  }
};

export default postReducer;
