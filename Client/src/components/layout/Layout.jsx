// Client/src/components/layout/Layout.jsx
import React from "react";
import Sidebar from "./Sidebar.jsx";
import TopBar from "./TopBar.jsx";
import OfflineBanner from "./OfflineBanner.jsx";

const Layout = ({ children }) => {
  return (
    <div className="layout-root">
      <Sidebar />
      <div className="layout-main">
        <TopBar />
        <OfflineBanner />
        <main className="layout-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
