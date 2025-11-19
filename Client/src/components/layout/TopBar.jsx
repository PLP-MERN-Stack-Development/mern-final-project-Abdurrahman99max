// Client/src/components/layout/TopBar.jsx
import React from "react";
import { useAuth } from "../../hooks/useAuth.jsx";

const TopBar = () => {
  const { user } = useAuth();

  return (
    <header className="layout-topbar">
      <div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>MicroBiz Inventory</div>
        <div style={{ fontSize: 11, color: "#9ca3af" }}>Store overview</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid rgba(148,163,184,0.5)",
            fontSize: 12,
            color: "#e5e7eb"
          }}
        >
          {user?.email}
        </div>
      </div>
    </header>
  );
};

export default TopBar;
