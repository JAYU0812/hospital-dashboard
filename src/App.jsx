import React, { useState } from "react";
import doctorsData from "./data/doctors";
import patientsData from "./data/patients";
import DoctorCard from "./components/DoctorCard";
import PatientList from "./components/PatientList";
import SearchBar from "./components/SearchBar";
import DepartmentFilter from "./components/DepartmentFilter";
import AppointmentForm from "./components/AppointmentForm";
import StatisticsCard from "./components/StatisticsCard";
import "./App.css";

// Sample initial appointments to pre-populate the list
const initialAppointments = [
  {
    id: 101,
    patientName: "Ramprasad Yadav",
    doctor: "Dr. Shailesh Bhatt",
    department: "Cardiology",
    date: "2026-07-15",
    time: "10:00"
  },
  {
    id: 102,
    patientName: "Munna Michael",
    doctor: "Dr. Richa Shah",
    department: "Pediatrics",
    date: "2026-07-16",
    time: "14:30"
  }
];

function App() {
  // 1. Core State variables (using React useState)
  const [appointments, setAppointments] = useState(initialAppointments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // 2. Derive unique departments dynamically from doctors data
  const uniqueDepartments = Array.from(
    new Set(doctorsData.map((doc) => doc.department))
  );

  // 3. Filter patients list dynamically in real-time using filter()
  const filteredPatients = patientsData.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDept =
      selectedDepartment === "All" || patient.department === selectedDepartment;
    return matchesSearch && matchesDept;
  });

  // 4. Appointment handlers (add and delete updates parent state)
  const handleAddAppointment = (newAppointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((app) => app.id !== id)
    );
  };

  // 5. Statistics structure to render dynamically using map()
  const statistics = [
    {
      id: "total-docs",
      label: "Total Doctors",
      value: doctorsData.length,
      icon: "👨‍⚕️",
      className: "stats-blue"
    },
    {
      id: "total-patients",
      label: "Total Patients",
      value: patientsData.length,
      icon: "🤕",
      className: "stats-green"
    },
    {
      id: "total-appointments",
      label: "Total Appointments",
      value: appointments.length,
      icon: "📅",
      className: "stats-orange"
    },
    {
      id: "total-depts",
      label: "Total Departments",
      value: uniqueDepartments.length,
      icon: "🏢",
      className: "stats-purple"
    }
  ];

  return (
    <div className="dashboard-layout">
      {/* Header section */}
      <header className="dashboard-header">
        <div className="logo-section">
          <span className="logo-icon">🏥</span>
          <h1>Tech-craft Hospital Management</h1>
        </div>
        <div className="date-display">
          <span>📅 {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
      </header>

      <main className="dashboard-main">
        {/* Statistics row rendered dynamically using map() */}
        <section className="stats-grid" aria-label="Dashboard Statistics">
          {statistics.map((stat) => (
            <StatisticsCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              className={stat.className}
            />
          ))}
        </section>

        {/* Patients and appointments scheduling row */}
        <div className="main-content-grid">
          {/* Patients view with search and filter controls */}
          <section className="patients-section">
            <div className="section-card">
              <div className="patients-header-controls">
                <h2>Patient Portal</h2>
                <div className="controls-row">
                  <SearchBar value={searchQuery} onChange={setSearchQuery} />
                  <DepartmentFilter
                    selectedDepartment={selectedDepartment}
                    onChange={setSelectedDepartment}
                    departments={uniqueDepartments}
                  />
                </div>
              </div>
              <PatientList patients={filteredPatients} />
            </div>
          </section>

          {/* Form and List for appointments */}
          <section className="appointments-section">
            {/* Appointment schedule form */}
            <div className="section-card">
              <AppointmentForm
                doctors={doctorsData}
                departments={uniqueDepartments}
                onAddAppointment={handleAddAppointment}
              />
            </div>

            {/* Active appointments schedule list */}
            <div className="section-card appointments-list-container">
              <h2>Appointments Schedule</h2>
              {appointments.length === 0 ? (
                <p className="no-appointments">No appointments scheduled today.</p>
              ) : (
                <div className="appointments-list">
                  {appointments.map((app) => (
                    <div key={app.id} className="appointment-item">
                      <div className="appointment-details">
                        <h4>{app.patientName}</h4>
                        <div className="appointment-meta">
                          <p>🩺 <strong>Doctor:</strong> {app.doctor}</p>
                          <p>🏢 <strong>Dept:</strong> {app.department}</p>
                          <p>📅 <strong>Date:</strong> {app.date} | 🕒 {app.time}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteAppointment(app.id)}
                        className="btn-delete"
                        aria-label={`Delete appointment for ${app.patientName}`}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Doctor profiles section */}
        <section className="doctors-section">
          <div className="section-card">
            <h2>Medical Staff Directory</h2>
            {/* Doctor cards rendered dynamically using map() */}
            <div className="doctors-grid">
              {doctorsData.map((doctor) => (
                <DoctorCard
                  key={doctor.id}
                  name={doctor.name}
                  department={doctor.department}
                  experience={doctor.experience}
                  availability={doctor.availability}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Tech-craft Hospital Systems. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
