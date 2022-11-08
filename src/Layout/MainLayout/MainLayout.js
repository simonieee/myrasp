import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="mainlayout-container">
      <Header />
      <div className="main-content-container">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
