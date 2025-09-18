import { useState } from "react";
import client from "../api/client";

export default function CollegeSearch({ onSaved }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await client.get(`/colleges/search`, {
        params: { query },
      });
      setResults(res.data || []);
    } catch (error) {
      setErr("No College Found. Try another College.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (college) => {
  try {
    await client.post("/colleges/save", college);
    if (typeof onSaved === "function") onSaved();
    setQuery("");     
    setResults([]);    
  } catch (error) {
    alert("Failed to save college");
  }
};

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          placeholder="Search college by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {err && <p style={{ color: "crimson" }}>{err}</p>}

      <ul>
        {results.map((c, i) => (
          <li key={`${c.name}-${i}`}>
            <div>
              <div><strong>{c.name}</strong></div>
              <small>{c.address}</small>
            </div>
           <button className="save-btn" onClick={() => handleSave(c)}>
  Save
</button>

          </li>
        ))}
      </ul>
    </div>
  );
}
