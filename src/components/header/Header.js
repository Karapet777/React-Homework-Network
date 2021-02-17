import React from "react";

import Link from "components/Link/Link";
import "./Header.scss";

const Header = () => {
  return (
    <div className="app-header-container">
      <nav className="app-header-container__nav">
        <ul className="app-header-container__nav__list">
          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/product">Product </Link>
          </li>

          <li>
            <Link to="/todos">Todos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
