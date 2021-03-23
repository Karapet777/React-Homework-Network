import React from "react";
import { Provider } from "react-redux";
import AppRoutes from "routes/AppRoutes";
import AppContextProvider from "context/AppContextProvider";
import store from "redux/index";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <AppContextProvider>
          <AppRoutes />
        </AppContextProvider>
      </Provider>
    </div>
  );
}

export default App;
