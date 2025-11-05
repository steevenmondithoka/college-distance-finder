import React from "react";

// Styles
const tableHeaderStyle = {
  textAlign: "left",
  padding: "10px",
  borderBottom: "2px solid #ddd",
  fontWeight: "bold",
  fontSize: "16px",
  whiteSpace: "nowrap",
};

const rowEvenStyle = {
  backgroundColor: "#ffffff",
};

const rowOddStyle = {
  backgroundColor: "#fafafa",
};

const cellStyle = {
  padding: "10px",
  borderBottom: "1px solid #ddd",
};

export default function DistanceList({ distances, selectedCollege }) {
  if (!distances?.length) return null;

  const getNearestLabel = (index) => {
    if (index === 0) return "First Nearest";
    if (index === 1) return "Second Nearest";
    if (index === 2) return "Third Nearest";
    return "NAN";
  };

  const parseCollegeData = (d) => {
    if (!d?.name) {
      return {
        name: "Unknown College",
        address: "Unknown Address",
      };
    }

    const parts = d.name.split(",");
    const name = parts[0]?.trim() || "Unknown College";
    const address = parts.length > 1 ? parts.slice(1).join(",").trim() : "Unknown Address";
    
    return { name, address };
  };

  return (
    <div style={{ padding: "20px" }} className="distance-list-container">
      <h2 style={{ marginBottom: "10px" }}>Nearby Colleges List</h2>

      {/* Flex container to stack label and table */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "#fff",
          gap: "15px",
        }}
      >
        {/* Selected College label */}
        {selectedCollege && (
          <div
            className="selected-college-label"
            style={{
              fontWeight: "bold",
              fontSize: "1rem",
              color: "#2c3e50",
              backgroundColor: "#e7f3ff",
              padding: "10px 15px",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)",
              maxWidth: "100%",
              overflowWrap: "break-word",
              wordBreak: "break-word",
              whiteSpace: "normal",
            }}
            title={selectedCollege}
          >
            Selected College: {selectedCollege}
          </div>
        )}

        {/* Table container with horizontal scroll (key for mobile) */}
        <div style={{ overflowX: "auto" }}>
          <table
            className="distances-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "600px", // scroll on small screens when needed
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={tableHeaderStyle}>#</th>
                <th style={tableHeaderStyle}>College Name</th>
                <th style={tableHeaderStyle}>Address</th>
                <th style={tableHeaderStyle}>Distance</th>
                <th style={tableHeaderStyle}>Proximity</th>
              </tr>
            </thead>
            <tbody>
              {distances.map((d, index) => {
                const { name, address } = parseCollegeData(d);

                return (
                  <tr key={d.id || index} style={index % 2 === 0 ? rowEvenStyle : rowOddStyle}>
                    <td style={cellStyle}>{index + 1}</td>
                    <td style={{ ...cellStyle, whiteSpace: "nowrap" }}>
                      <b>{name}</b>
                    </td>
                    <td style={cellStyle}>{address}</td>
                    <td style={cellStyle}>
                      <span style={{ fontWeight: "bold", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
                        {Number.isFinite(d.distance_km) ? d.distance_km.toFixed(2) : "0.00"}
                        <span style={{ marginLeft: "3px", fontSize: "0.9em" }}> km</span>
                      </span>
                    </td>

                    <td style={cellStyle}>
                      <span
                        style={{
                          backgroundColor:
                            index === 0
                              ? "#28a745"
                              : index === 1
                                ? "#ffc107"
                                : index === 2
                                  ? "#fd7e14"
                                  : "#6c757d",
                          color: index === 0 ? "white" : index === 1 ? "#343a40" : "white",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: "28px",
                          textAlign: "center",
                          whiteSpace: "nowrap",
                          fontSize: "14px",
                          fontWeight: "bold",
                          minWidth: "120px",
                        }}
                        title={getNearestLabel(index)}
                      >
                        {getNearestLabel(index)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Responsive styles */}
      <style>
        {`
          .distance-list-container h2 {
            font-size: 1.5rem;
          }

          @media (max-width: 768px) {
            .distance-list-container {
              padding: 10px !important;
            }
            .distance-list-container h2 {
              font-size: 1.25rem !important;
            }
            .distance-list-container > div:nth-child(2) {
              padding: 10px !important;
            }
            .selected-college-label {
              font-size: 0.9rem !important;
              padding: 8px 10px !important;
            }
            .distances-table {
              min-width: 500px !important;
            }
          }

          @media (max-width: 480px) {
            .distance-list-container h2 {
              font-size: 1.1rem !important;
            }
            .selected-college-label {
              font-size: 0.85rem !important;
              padding: 6px 8px !important;
            }
            .distances-table {
              min-width: 400px !important;
            }
          }
        `}
      </style>
    </div>
  );
}