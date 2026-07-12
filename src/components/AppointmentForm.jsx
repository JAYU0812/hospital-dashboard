import React, { useState } from "react";

const AppointmentForm = ({ doctors, departments, onAddAppointment }) => {
  // Local state for each form field
  const [patientName, setPatientName] = useState("");
  const [doctor, setDoctor] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!patientName.trim() || !doctor || !department || !date || !time) {
      alert("Please fill in all fields.");
      return;
    }

    // Create new appointment object
    const newAppointment = {
      id: Date.now(), // simple unique id
      patientName,
      doctor,
      department,
      date,
      time,
    };

    // Call parent handler to add to state
    onAddAppointment(newAppointment);

    // Reset local form state
    setPatientName("");
    setDoctor("");
    setDepartment("");
    setDate("");
    setTime("");
  };

  return (
    <div className="appointment-form-container">
      <h2>Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="form-patient-name">Patient Name</label>
          <input
            id="form-patient-name"
            type="text"
            placeholder="Enter patient name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="form-doctor">Doctor</label>
            <select
              id="form-doctor"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name} ({doc.department})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="form-department">Department</label>
            <select
              id="form-department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="form-date">Date</label>
            <input
              id="form-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="form-time">Time</label>
            <input
              id="form-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn-submit">
          📅 Add Appointment
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
