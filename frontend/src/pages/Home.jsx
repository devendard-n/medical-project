import React from "react";
import { Link } from "react-router-dom";
import "../global.css";

function Home() {
  return (
    <div className="container">
      <div className="card">
        <h1>Hospital AI Appointment System</h1>

        <p>
          Use AI chatbot to detect symptoms and book appointments easily.
        </p>

        <br />

        <Link to="/chatbot">
          <button>Start Chatbot</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;