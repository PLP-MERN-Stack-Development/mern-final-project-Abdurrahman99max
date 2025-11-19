// Client/src/components/layout/Sidebar.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.jsx";

const navItems = [
  { path: "/", label: "Dashboard", icon: "📊" },
  { path: "/products", label: "Products", icon: "📦" },
  { path: "/sales", label: "Sales", icon: "💸" },
  { path: "/reports", label: "Reports", icon: "📈" },
  { path: "/settings", label: "Settings", icon: "⚙️" }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <aside className="layout-sidebar">
      <div className="sidebar-logo">MICROBIZ</div>
      <div className="sidebar-section-label">OVERVIEW</div>
      <div className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.path}
            className={
              "sidebar-item" +
              (location.pathname === item.path ? " active" : "")
            }
            onClick={() => navigate(item.path)}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-section-label" style={{ marginTop: "auto" }}>
        ACCOUNT
      </div>
      <div className="sidebar-nav">
        <div className="sidebar-item" onClick={logout}>
          <span className="icon">🚪</span>
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
