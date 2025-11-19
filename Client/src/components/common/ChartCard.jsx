// client/src/components/common/StatCard.jsx
import React from "react";

const StatCard = ({ label, value, hint }) => {
  return (
    <div className="card stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {hint && <div className="stat-hint">{hint}</div>}
    </div>
  );
};

export default StatCard;


