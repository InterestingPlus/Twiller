import React from "react";
import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";

const CustomLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <NavLink
        style={{
          textDecoration: "none",
          // color: match ? "var(--twitter-color)" : "black",
        }}
        to={to}
        {...props}
        className="nav__links"
      >
        {children}
      </NavLink>
    </>
  );
};

export default CustomLink;
