import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import ChatbotPage from "./pages/ChatbotPage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import History from "./pages/History";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login";
import Billing from "./pages/Billing";

function App() {
    return (
        <Router>
            <Navbar />

            <div className="app-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/chatbot" element={<ChatbotPage />} />
                    <Route path="/admin" element={<AdminLogin />} />
                    <Route path="/dashboard" element={<AdminDashboard />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/billing" element={<Billing />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;