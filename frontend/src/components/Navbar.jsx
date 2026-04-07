import React from "react";
import { Link } from "react-router-dom";
import "../global.css"

function Navbar() {
  return (
    <div className="navbar">
      <h2>🏥 Hospital AI</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/chatbot">Chatbot</Link>
        <Link to="/billing">Billing</Link>
        <Link to="/history">History</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}

export default Navbar;