import React from "react";
import "./SidebarOption.css";
import HomeIcon from "@mui/icons-material/Home";

const SidebarOption = ({ active, text, Icon }) => {
  return (
    <>
      <Icon />
      <h2>{text}</h2>
    </>
  );
};

export default SidebarOption;
