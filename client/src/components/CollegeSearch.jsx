import { useState } from "react";
import client from "../api/client";

export default function CollegeSearch({ onSaved }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  // Initializing err as null can sometimes be slightly cleaner for checks
  const [err, setErr] = useState(null); 

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setErr(null); // Clear previous errors
    setLoading(true);
    try {
      const res = await client.get(`/colleges/search`, {
        params: { query },
      });
      setResults(res.data || []);
      // If no results, set a message
      if (!res.data || res.data.length === 0) {
        setErr("No College Found. Try another College.");
      }
    } catch (error) {
      // Catch network or API errors
      setErr("Error searching for college. Please try again.");
      setResults([]);
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
      setErr(null); // Clear search error after successful save
    } catch (error) {
      alert("Failed to save college");
    }
  };

  return (
    <div className="college-search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          className="search-input"
          placeholder="Search college by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="search-button"
          type="submit"
          disabled={loading || !query.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* The check for 'err' is safe: only renders if err is not null/empty string */}
      {err && <p style={{ color: "crimson", margin: "10px 0" }}>{err}</p>}

      <ul className="search-results-list">
        {results.map((c, i) => (
          <li key={`${c.name}-${i}`} className="search-result-item">
            <div className="college-details">
              <div><strong>{c.name}</strong></div>
              <small>{c.address}</small>
            </div>
            <button className="save-btn" onClick={() => handleSave(c)}>
              Save
            </button>
          </li>
        ))}
      </ul>
      
      <style>{`
        /* ... CSS for responsiveness ... */
        .college-search-container {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin-bottom: 20px;
          background-color: #f7f7f7;
        }

        .search-form {
          display: flex;
          gap: 10px;
        }

        .search-input {
          flex-grow: 1;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        .search-button {
          padding: 10px 15px;
          background-color: #5b86e2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.2s;
        }

        .search-button:disabled {
          background-color: #a0c3ff;
          cursor: not-allowed;
        }

        .search-results-list {
          list-style: none;
          padding: 0;
          margin-top: 15px;
        }

        .search-result-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          border-bottom: 1px solid #eee;
          background-color: #fff;
          margin-bottom: 5px;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .college-details {
          flex-grow: 1;
          margin-right: 10px;
          overflow: hidden;
        }
        
        .college-details small {
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        .save-btn {
          padding: 8px 12px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          min-width: 60px;
          font-size: 14px;
          flex-shrink: 0;
        }
        
        @media (max-width: 600px) {
          .search-form {
            flex-direction: column;
            gap: 8px;
          }

          .search-input {
            width: 100%;
          }

          .search-button {
            width: 100%;
          }
          
          .search-result-item {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .college-details {
            margin-bottom: 8px;
            margin-right: 0;
            width: 100%;
          }
          
          .college-details small {
            white-space: normal;
            overflow: visible;
            text-overflow: clip;
          }

          .save-btn {
            width: 100%;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
}