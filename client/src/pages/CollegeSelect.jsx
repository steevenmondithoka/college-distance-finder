import { useEffect, useState } from "react";
import client from "../api/client";
import CollegeSearch from "../components/CollegeSearch";
import DistanceList from "../components/DistanceList";
import "../App.css";

export default function CollegeSelect() {
  const [colleges, setColleges] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [distances, setDistances] = useState([]);

  const fetchColleges = async () => {
    const res = await client.get("/colleges");
    setColleges(res.data || []);
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSelect = async (id) => {
    setSelectedId(id);
    const res = await client.get(`/colleges/distances/${id}`);
    setDistances(res.data?.distances || []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) return;

    try {
      await client.delete(`/colleges/${id}`);
      fetchColleges(); // refresh after deletion
    } catch (err) {
      alert("Failed to delete college");
    }
  };

  return (
    <div className="college-select-container">
      <h1 className="title">College Distance Finder</h1>

      <h2 className="subtitle">Search & Save College</h2>
      <CollegeSearch onSaved={fetchColleges} />

      <h2 className="subtitle">Saved Colleges</h2>
      <ul className="college-list">
        {colleges.map((c) => (
          <li key={c._id} className="college-item">
            <div className="college-info">
              <strong className="college-name">{c.name}</strong>
              <small className="college-address">{c.address}</small>
            </div>

            <div className="college-actions">
  <button
    className={`select-btn ${selectedId === c._id ? "selected" : ""}`}
    onClick={() => handleSelect(c._id)}
  >
    {selectedId === c._id ? "Selected" : "Select"}
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(c._id)}
  >
    Delete
  </button>
</div>

          </li>
        ))}
      </ul>

      <DistanceList distances={distances} />
    </div>
  );
}
