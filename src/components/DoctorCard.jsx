import React from "react";

const DoctorCard = ({ name, department, experience, availability }) => {
  // Determine CSS class based on availability status
  let statusClass = "status-available";
  if (availability === "In Surgery") {
    statusClass = "status-surgery";
  } else if (availability === "Off Duty") {
    statusClass = "status-offduty";
  } else if (availability === "On Leave") {
    statusClass = "status-leave";
  }

  return (
    <div className="doctor-card">
      <div className="doctor-avatar">
        <span>👨‍⚕️</span>
      </div>
      <div className="doctor-info">
        <h3>{name}</h3>
        <p className="dept-badge">{department}</p>
        <p className="exp-text">💼 {experience} Experience</p>
        <span className={`status-badge ${statusClass}`}>{availability}</span>
      </div>
    </div>
  );
};

export default DoctorCard;
