import { useEffect, useState } from "react";
import client from "../api/client";
import CollegeSearch from "../components/CollegeSearch";
import DistanceList from "../components/DistanceList";
import "../App.css";

export default function CollegeSelect() {
  const [colleges, setColleges] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [distances, setDistances] = useState([]);
  const [distanceErr, setDistanceErr] = useState(null); // Added for robust error handling

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
    }
  };

  useEffect(() => {
    fetchColleges();
  }, []);

  const handleSelect = async (id) => {
    setDistanceErr(null);

    // Toggle logic: If the same college is selected again, deselect it.
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
      
      {/* Responsive Styles (Using embedded CSS to not alter UI on desktop) */}
      <style>{`
        /* 
         * Ensure the main container is constrained and padding adjusted on mobile
         * Note: This assumes the original App.css has no max-width.
         */
        .college-select-container {
            max-width: 900px;
            margin: 0 auto;
            padding: 10px; 
        }

        @media (max-width: 600px) {
            /* Reduce font sizes for titles on mobile */
            .title {
                font-size: 1.5rem !important;
            }
            .subtitle {
                font-size: 1.2rem !important;
                margin-top: 20px !important;
            }

            /* College Item: Change from horizontal (flex) to vertical (stacking) */
            .college-item {
                flex-direction: column !important;
                align-items: flex-start !important;
                padding: 10px !important; 
            }

            /* College Info: Take full width and allow wrapping */
            .college-info {
                margin-bottom: 10px !important; 
                margin-right: 0 !important;
                width: 100% !important;
                overflow: hidden !important;
            }
            
            /* Ensure long names/addresses wrap */
            .college-name, .college-address {
                white-space: normal !important;
                overflow: visible !important;
                text-overflow: clip !important;
            }

            /* College Actions: Make buttons full width and stacked horizontally */
            .college-actions {
                width: 100% !important;
                flex-direction: row !important;
                justify-content: space-between !important; 
                gap: 8px !important; 
            }
            
            /* Make buttons fill the available space */
            .college-actions button {
                flex-grow: 1 !important; 
                min-width: unset !important;
                padding: 10px 12px !important;
            }
        }
      `}</style>
    </div>
  );
}