import { useEffect, useState } from "react";
import client from "../api/client";
import CollegeSearch from "../components/CollegeSearch";
import DistanceList from "../components/DistanceList";
import "../App.css";

export default function CollegeSelect() {
  const [colleges, setColleges] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [distances, setDistances] = useState([]);
  const [distanceErr, setDistanceErr] = useState(null); // New state for distance errors

  const fetchColleges = async () => {
    try {
      const res = await client.get("/colleges");
      setColleges(res.data || []);
      // If the selected college was deleted, reset selection
      if (selectedId && !res.data.some(c => c._id === selectedId)) {
        setSelectedId("");
        setDistances([]);
        setDistanceErr(null);
      }
    } catch (error) {
      console.error("Error fetching colleges:", error);
      // Could set a global error state here if needed
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSelect = async (id) => {
    setDistanceErr(null); // Clear previous errors
    
    // Toggle selection
    if (selectedId === id) {
        setSelectedId("");
        setDistances([]);
        return;
    }
    
    setSelectedId(id);
    try {
      const res = await client.get(`/colleges/distances/${id}`);
      setDistances(res.data?.distances || []);
      if (!res.data?.distances?.length) {
        setDistanceErr("No nearby colleges found for this selection.");
      }
    } catch (error) {
      console.error("Error fetching distances:", error);
      setDistances([]);
      setDistanceErr("Failed to load nearby colleges. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this college?")) return;

    try {
      await client.delete(`/colleges/${id}`);
      fetchColleges(); // refresh after deletion
      if (selectedId === id) {
        setSelectedId("");
        setDistances([]);
        setDistanceErr(null);
      }
    } catch (err) {
      alert("Failed to delete college");
    }
  };
  
  const selectedCollegeName = colleges.find(c => c._id === selectedId)?.name;

  return (
    <div className="college-select-container">
      <h1 className="title">College Distance Finder</h1>

      <h2 className="subtitle">Search & Save College</h2>
      <CollegeSearch onSaved={fetchColleges} />

      <h2 className="subtitle">Saved Colleges</h2>
      <ul className="college-list">
        {!colleges.length ? (
            <p style={{ textAlign: 'center', color: '#666', padding: '10px' }}>No saved colleges yet. Search and save one above!</p>
        ) : (
            colleges.map((c) => (
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
            ))
        )}
      </ul>
      
      {distanceErr && <p style={{ color: "crimson", margin: "15px 0", textAlign: "center" }}>{distanceErr}</p>}

      <DistanceList distances={distances} selectedCollege={selectedCollegeName} />
      
      {/* Responsive Styles for CollegeSelect (and general layout) */}
      <style>{`
        /* ... CSS for responsiveness ... */
        .college-select-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 10px;
        }
        
        .title {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
            font-size: 2rem;
        }

        .subtitle {
            border-bottom: 2px solid #ddd;
            padding-bottom: 5px;
            margin-top: 30px;
            margin-bottom: 15px;
            color: #5b86e2;
            font-size: 1.5rem;
        }

        .college-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .college-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          margin-bottom: 10px;
          background-color: #fff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .college-info {
          flex-grow: 1;
          margin-right: 15px;
          overflow: hidden;
        }
        
        .college-name {
            display: block;
            font-size: 1.1rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .college-address {
            display: block;
            color: #666;
            font-size: 0.9rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .college-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }
        
        .select-btn, .delete-btn {
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            min-width: 80px;
        }

        .select-btn {
            background-color: #007bff;
            color: white;
        }
        
        .select-btn.selected {
            background-color: #28a745;
        }

        .delete-btn {
            background-color: #dc3545;
            color: white;
        }
        
        @media (max-width: 600px) {
            .college-select-container {
                padding: 5px;
            }
            
            .title {
                font-size: 1.5rem;
            }

            .subtitle {
                font-size: 1.2rem;
                margin-top: 20px;
            }
            
            .college-item {
                flex-direction: column;
                align-items: flex-start;
                padding: 10px;
            }
            
            .college-info {
                margin-bottom: 10px;
                margin-right: 0;
                width: 100%;
            }
            
            .college-name, .college-address {
                white-space: normal;
                overflow: visible;
                text-overflow: clip;
            }

            .college-actions {
                width: 100%;
                flex-direction: row;
                justify-content: space-around;
            }
            
            .select-btn, .delete-btn {
                flex-grow: 1;
                min-width: unset;
            }
        }
      `}</style>
    </div>
  );
}