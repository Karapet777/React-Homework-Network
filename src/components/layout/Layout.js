import React from "react";

import "./Layout.scss";

const Layout = ({ children }) => {
  return (
    <div className="app-layout-container">
      <main className="app-layout-container__main">{children}</main>
    </div>
  );
};

export default Layout;
