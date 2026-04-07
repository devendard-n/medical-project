import { useState, useEffect } from "react";
import React from "react";
import "../global.css";

function Billing() {

    const [meds, setMeds] = useState(
        JSON.parse(localStorage.getItem("meds")) || []
    );

    const [patient, setPatient] = useState("");
    const [phone, setPhone] = useState("");

    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const [cart, setCart] = useState([]);

    useEffect(() => {

        const today = new Date();

        let updated = meds.filter(m => new Date(m.expiry) > today);

        localStorage.setItem("meds", JSON.stringify(updated));

        setMeds(updated);

    }, []);

    const searchMedicine = (value) => {

        setSearch(value);

        const filtered = meds.filter(m =>
            m.name.toLowerCase().includes(value.toLowerCase())
        );

        setSuggestions(filtered);

    };

    const selectMedicine = (med) => {

        if (med.stock === 0) {
            alert("Out of stock");
            return;
        }

        setCart([...cart, { ...med, qty: 1 }]);

        setSearch("");
        setSuggestions([]);

    };

    const changeQty = (index, value) => {

        const updated = [...cart];

        if (value > updated[index].stock) {
            alert("Cannot sell more than stock");
            return;
        }

        updated[index].qty = value;

        setCart(updated);

    };

    const printBill = () => {

        window.print();

    };

    const saveBill = () => {

        if (cart.length === 0) {
            alert("No medicines added");
            return;
        }

        if (!patient || !phone) {
            alert("Enter patient details");
            return;
        }

        let updated = [...meds];

        cart.forEach(item => {

            let index = updated.findIndex(m => m.name === item.name);

            updated[index].stock -= item.qty;

        });

        updated = updated.filter(m => m.stock > 0);

        localStorage.setItem("meds", JSON.stringify(updated));

        setMeds(updated);

        let history = JSON.parse(localStorage.getItem("billHistory")) || [];

        const bill = {
            date: new Date().toLocaleString(),
            patientName: patient,
            phone: phone,
            items: cart,
            total: cart.reduce((sum, i) => sum + (i.mrp * i.qty), 0)
        };

        history.push(bill);

        localStorage.setItem("billHistory", JSON.stringify(history));

        alert("Bill Generated");

        setCart([]);

    };

    const total = cart.reduce((sum, i) => sum + (i.mrp * i.qty), 0);

    return (

        <div className="billing-page">

            <h1>Billing</h1>

            <div className="patient-box">

                <input placeholder="Patient Name"
                    onChange={(e) => setPatient(e.target.value)}
                />

                <input placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                />

            </div>

            <div className="search-box">

                <input
                    placeholder="Search Medicine"
                    value={search}
                    onChange={(e) => searchMedicine(e.target.value)}
                />

                <div className="suggestions">

                    {suggestions.map((m, i) => (
                        <div
                            key={i}
                            className="suggestion-item"
                            onClick={() => selectMedicine(m)}
                        >
                            {m.name}
                        </div>
                    ))}

                </div>

            </div>

            <table>

                <thead>
                    <tr>
                        <th>Medicine</th>
                        <th>MRP</th>
                        <th>Qty</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>

                    {cart.map((c, i) => {

                        const total = c.mrp * c.qty;

                        return (

                            <tr key={i}>
                                <td>{c.name}</td>
                                <td>{c.mrp}</td>
                                <td>

                                    <input
                                        type="number"
                                        value={c.qty}
                                        min="1"
                                        onChange={(e) => changeQty(i, e.target.value)}
                                    />

                                </td>
                                <td>{total}</td>
                            </tr>

                        );

                    })}

                </tbody>

            </table>

            <h2>Total: ₹{total}</h2>

            <button onClick={saveBill}>Generate Bill</button>

            <button onClick={printBill}>Print Receipt</button>

        </div>

    );

}

export default Billing;