import { createContext } from "react";

export const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  Posts: null,
  hesMore: true,
};

export const AppContext = createContext(initialState);
