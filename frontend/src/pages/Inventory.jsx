import { useState, useEffect } from "react";
import React from "react";
import "../global.css";

function Inventory() {

    const [meds, setMeds] = useState(
        JSON.parse(localStorage.getItem("meds")) || []
    );

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [mrp, setMrp] = useState("");
    const [stock, setStock] = useState("");
    const [expiry, setExpiry] = useState("");

    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {

        const today = new Date();

        let updated = meds.filter(m => new Date(m.expiry) > today);

        localStorage.setItem("meds", JSON.stringify(updated));

        setMeds(updated);

    }, []);

    const saveMedicine = () => {

        if (!name || !mrp || !stock) {
            alert("Enter medicine details");
            return;
        }

        const newMed = {
            name,
            category,
            mrp: Number(mrp),
            stock: Number(stock),
            expiry
        };

        let updated = [...meds];

        if (editIndex !== null) {

            updated[editIndex] = newMed;
            setEditIndex(null);

        } else {

            updated.push(newMed);

        }

        setMeds(updated);

        localStorage.setItem("meds", JSON.stringify(updated));

        setName("");
        setCategory("");
        setMrp("");
        setStock("");
        setExpiry("");

    };

    const editMedicine = (index) => {

        const med = meds[index];

        setName(med.name);
        setCategory(med.category);
        setMrp(med.mrp);
        setStock(med.stock);
        setExpiry(med.expiry);

        setEditIndex(index);

    };

    const deleteMedicine = (index) => {

        let updated = [...meds];

        updated.splice(index, 1);

        setMeds(updated);

        localStorage.setItem("meds", JSON.stringify(updated));

    };

    return (

        <div className="inventory-page">

            <h1>Inventory</h1>

            <div className="inventory-form">

                <input placeholder="Medicine Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input placeholder="MRP"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                />

                <input placeholder="Stock"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <input type="date"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                />

                <button onClick={saveMedicine}>
                    {editIndex !== null ? "Update" : "Add Medicine"}
                </button>

            </div>

            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>MRP</th>
                        <th>Stock</th>
                        <th>Expiry</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody>

                    {meds.map((m, i) => (

                        <tr key={i} className={m.stock < 5 ? "low-stock" : ""}>

                            <td>{m.name}</td>
                            <td>{m.category}</td>
                            <td>₹{m.mrp}</td>
                            <td>{m.stock}</td>
                            <td>{m.expiry}</td>

                            <td>

                                <button onClick={() => editMedicine(i)}>Edit</button>

                                <button onClick={() => deleteMedicine(i)}>Delete</button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default Inventory;