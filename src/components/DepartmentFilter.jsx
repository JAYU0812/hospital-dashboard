import React from "react";

const DepartmentFilter = ({ selectedDepartment, onChange, departments }) => {
  return (
    <div className="department-filter">
      <label htmlFor="dept-filter-select" className="filter-label">Filter Department:</label>
      <select
        id="dept-filter-select"
        value={selectedDepartment}
        onChange={(e) => onChange(e.target.value)}
        className="filter-select"
      >
        <option value="All">All Departments</option>
        {departments.map((dept) => (
          <option key={dept} value={dept}>
            {dept}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DepartmentFilter;
