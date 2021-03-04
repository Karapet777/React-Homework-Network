import React, { useReducer } from "react";

import { AppContext, initialState } from "context/AppContext";
import appReducer from "context/appReducer";

const AppContextProvider = ({ children }) => {
  // const [user, setUser] = useState(null);
  const [state, dispatch] = useReducer(appReducer, initialState);

  // const setUserHandler = (newUser) => {
  //   setUser(newUser);
  // };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
