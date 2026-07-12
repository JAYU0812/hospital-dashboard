import React from "react";

const StatisticsCard = ({ label, value, icon, className }) => {
  return (
    <div className={`stats-card ${className || ""}`}>
      <div className="stats-icon-wrapper">
        <span className="stats-icon">{icon}</span>
      </div>
      <div className="stats-details">
        <span className="stats-label">{label}</span>
        <h3 className="stats-value">{value}</h3>
      </div>
    </div>
  );
};

export default StatisticsCard;
