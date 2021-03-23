import React, { useContext } from "react";
import { AppContext } from "context/AppContext";
import user from "assets/user.png";

import "./Profile.scss";

const Profile = () => {
  const context = useContext(AppContext);

  return (
    <div className="app-profile-container">
      {context.state.user && (
        <div className="app-profile-container__block-user">
          <img src={user} alt="user" />
          <p> {context.state.user.displayName}</p>
          <p> {context.state.user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
