import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "./Layout.css";

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <Outlet /> {/* Ici on injecte Dashboard / Patients / Détails */}
        </div>
      </div>
    </div>
  );
};

export default Layout;
