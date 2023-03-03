import React from "react";
import { Outlet } from "react-router-dom";

interface ILayoutProps {}

const Layout = () => {
  return (
    <div>
      <div>123</div>
      <Outlet />
    </div>
  );
};

export default Layout;
