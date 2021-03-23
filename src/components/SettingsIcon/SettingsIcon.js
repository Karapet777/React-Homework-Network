import React from "react";
import PropsType from "prop-types";
import SettingsIcon from "@material-ui/icons/Settings";

import "./SettingsIcon.scss";

const SettingIcon = ({ onClick, className }) => {
  return (
    <div>
      <SettingsIcon onClick={onClick} className={`SettingIcon  ${className}`} />
    </div>
  );
};

SettingIcon.propsType = {
  onClick: PropsType.fun,
  className: PropsType.string,
};

export default SettingIcon;
