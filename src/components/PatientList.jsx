import React from "react";

const PatientList = ({ patients }) => {
  return (
    <div className="patient-list-container">
      <h2>Patients List</h2>
      {patients.length === 0 ? (
        <div className="no-patients-found">No patients found matching the criteria.</div>
      ) : (
        <div className="table-responsive">
          <table className="patient-table">
            <thead>
              <tr>
                <th>Patient Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Assigned Doctor</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id}>
                  <td className="patient-name-cell">{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.assignedDoctor}</td>
                  <td>
                    <span className="patient-dept-badge">{patient.department}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientList;
