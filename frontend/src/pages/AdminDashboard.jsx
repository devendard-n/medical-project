import { useEffect, useState } from "react";
import API from "../api";
import React from "react";
import "../global.css";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    const res = await API.get("/appointments");
    setAppointments(res.data);
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Dashboard</h2>

        <table>
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {appointments.map((a) => (
              <tr key={a.id}>
                <td>{a.patientName}</td>
                <td>{a.doctor}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
                <td>{a.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;