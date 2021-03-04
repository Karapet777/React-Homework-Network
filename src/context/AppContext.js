import { createContext } from "react";

export const initialState = {
  user: null,
  // setUser: () => {},
};

export const AppContext = createContext(initialState);
