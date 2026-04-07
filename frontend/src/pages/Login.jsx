import { useState } from "react"
import "../styles/app.css"
import React from "react";

function Login({ setLoggedIn }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {

        const adminUser = "admin"
        const adminPass = "admin123"

        if (username === adminUser && password === adminPass) {

            setLoggedIn(true)

        } else {

            setError("Invalid username or password")

        }

    }

    return (

        <div className="login-container">

            <div className="login-box">

                <h2>Pharmacy Login</h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="error">{error}</p>}

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>

    )

}

export default Login