import React from "react";

import "pages/errorPage/ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error-container">
      <div className="error-container__block">
        <p className="error-container__block__status">Error 404</p>
        <p className="error-container__block__errText">Page Not Founde</p>
      </div>
    </div>
  );
};

export default ErrorPage;
