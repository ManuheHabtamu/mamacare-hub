import React, { useState, useEffect } from "react";
import api from "../../utils/api.js";
import "../../stylesheets/BabyGrowthTracker.css";

function BabyGrowthTracker() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bmi, setBmi] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await api.get("/babygrowth");
            setData(res.data);
        } catch (err) {
            console.error("Failed to fetch baby growth data", err);
        } finally {
            setLoading(false);
        }
    };

    const calculateBMI = () => {
        if (weight && height) {
            const hInMeters = height / 100;
            const result = (weight / (hInMeters * hInMeters)).toFixed(2);
            setBmi(result);
        }
    };

    const handleInfoUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const babyInfo = {
            name: formData.get("name"),
            dob: formData.get("dob"),
            gender: formData.get("gender"),
        };
        try {
            const res = await api.put("/babygrowth", { babyInfo });
            setData(res.data);
            alert("Baby info updated!");
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddRecord = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const record = {
            date: formData.get("date"),
            weight: parseFloat(formData.get("weight")),
            height: parseFloat(formData.get("height")),
            headCircumference: parseFloat(formData.get("head")),
        };
        try {
            const res = await api.post("/babygrowth/records", record);
            setData(res.data);
            e.target.reset();
        } catch (err) {
            console.error(err);
        }
    };

    const calculateAge = (dob) => {
        if (!dob) return "N/A";
        const diff = new Date() - new Date(dob);
        const weeks = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
        const months = Math.floor(diff / (30.44 * 24 * 60 * 60 * 1000));
        return `${weeks} weeks (${months} months)`;
    };

    if (loading) return <div className="tracker-container"><h1>Loading...</h1></div>;

    return (
        <div className="tracker-container">
            <header className="tracker-header">
                <h1>Baby Growth Tracker</h1>
                <p>Track your little one's progress</p>
            </header>

            <div className="tracker-grid">
                {/* Baby Info Section */}
                <section className="tracker-card info-section">
                    <h2>Baby Info</h2>
                    <form onSubmit={handleInfoUpdate}>
                        <div className="input-group">
                            <label>Name</label>
                            <input name="name" defaultValue={data?.babyInfo?.name} placeholder="Baby Name" />
                        </div>
                        <div className="input-group">
                            <label>Date of Birth</label>
                            <input name="dob" type="date" defaultValue={data?.babyInfo?.dob?.split("T")[0]} />
                        </div>
                        <div className="input-group">
                            <label>Gender</label>
                            <select name="gender" defaultValue={data?.babyInfo?.gender}>
                                <option value="">Select Gender</option>
                                <option value="Boy">Boy</option>
                                <option value="Girl">Girl</option>
                            </select>
                        </div>
                        <p className="age-display">Age: {calculateAge(data?.babyInfo?.dob)}</p>
                        <button type="submit" className="save-btn">Update Info</button>
                    </form>
                </section>

                {/* BMI Calculator */}
                <section className="tracker-card bmi-section">
                    <h2>BMI Calculator (Baby/Toddler)</h2>
                    <div className="input-group">
                        <label>Weight (kg)</label>
                        <input type="number" step="0.1" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0.0" />
                    </div>
                    <div className="input-group">
                        <label>Height (cm)</label>
                        <input type="number" step="0.1" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="0.0" />
                    </div>
                    <button onClick={calculateBMI} className="calc-btn">Calculate BMI</button>
                    {bmi && <p className="bmi-result">BMI: <strong>{bmi}</strong></p>}
                </section>

                {/* Records Section */}
                <section className="tracker-card records-section">
                    <h2>Growth Records</h2>
                    <form onSubmit={handleAddRecord} className="record-form">
                        <input name="date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} />
                        <input name="weight" type="number" step="0.1" placeholder="Wt (kg)" required />
                        <input name="height" type="number" step="0.1" placeholder="Ht (cm)" required />
                        <input name="head" type="number" step="0.1" placeholder="Head (cm)" required />
                        <button type="submit" className="add-btn">Add Record</button>
                    </form>
                    <div className="records-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Wt</th>
                                    <th>Ht</th>
                                    <th>Head</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.growthRecords?.slice().reverse().map((r, i) => (
                                    <tr key={i}>
                                        <td>{new Date(r.date).toLocaleDateString()}</td>
                                        <td>{r.weight}kg</td>
                                        <td>{r.height}cm</td>
                                        <td>{r.headCircumference}cm</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

            </div>
        </div>
    );
}

export default BabyGrowthTracker;
