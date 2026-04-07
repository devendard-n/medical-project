import React from "react";
import "../global.css";

function History() {

    const history =
        JSON.parse(localStorage.getItem("billHistory")) || []

    return (

        <div>

            <h1>Billing History</h1>

            {history.map((bill, i) => (
                <div key={i}>
                    <h3>{bill.patientName}</h3>
                    <p>Total ₹{bill.total}</p>
                </div>
            ))}

        </div>

    )

}

export default History;