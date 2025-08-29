import React from "react";
import PropTypes from "prop-types";
import { Outlet } from "react-router-dom";

function UserRootLayout(props) {
  return (
    <div className=" ">
      <Outlet />
    </div>
  );
}

UserRootLayout.propTypes = {};

export default UserRootLayout;
