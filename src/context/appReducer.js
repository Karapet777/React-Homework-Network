const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "REMOVE_USER":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};
export default appReducer;
