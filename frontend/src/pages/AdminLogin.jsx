import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import React from "react";
import "../global.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    const res = await API.post("/admin/login", {
      username,
      password
    });

    if (res.data.success) {
      navigate("/dashboard");
    } else {
      alert("Invalid login");
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}

export default AdminLogin;