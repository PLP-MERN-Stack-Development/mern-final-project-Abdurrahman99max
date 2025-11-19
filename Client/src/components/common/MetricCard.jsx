// client/src/components/common/MiniBarChart.jsx
import React from "react";

/**
 * MiniBarChart
 * - Simple, clean bar chart using CSS flexbox
 * - Shows relative heights + labels
 * - Looks good in cards and dashboards
 */
const MiniBarChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="mini-chart-empty">
        No sales yet. Try loading demo data or recording a sale.
      </div>
    );
  }

  const values = data.map((d) => d.value || 0);
  const max = Math.max(...values, 1);

  return (
    <div className="mini-chart-wrapper">
      <div className="mini-chart-scale">
        <span className="scale-label">High</span>
        <span className="scale-line" />
        <span className="scale-label">Low</span>
      </div>
      <div className="mini-chart">
        {data.map((d) => {
          const heightPercent = Math.max((d.value / max) * 100, 8);
          return (
            <div key={d.label} className="mini-chart-column">
              <div
                className="mini-chart-bar"
                style={{ height: `${heightPercent}%` }}
                title={`${d.label}: ${d.value.toLocaleString()}`}
              />
              <span className="mini-chart-label">{d.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniBarChart;


