import axios from "axios";
import College from "../models/College.js";
import { haversineKm } from "../utils/haversine.js";
import dotenv from "dotenv";

dotenv.config();

// GET /api/colleges/search?query=
export const searchColleges = async (req, res) => {
  const { query } = req.query;
  if (!query || !query.trim()) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const response = await axios.get("https://us1.locationiq.com/v1/search.php", {
      params: {
        key: process.env.LOCATIONIQ_API_KEY,
        q: query,
        format: "json",
        limit: 7,
      },
      timeout: 10000,
      headers: { "User-Agent": "college-distance-finder/1.0" },
    });

    // Normalize
    const results = (response.data || [])
      .map((item) => ({
        name: item.display_name,
        address: item.display_name,
        lat: parseFloat(item.lat),
        lon: parseFloat(item.lon),
      }))
      .filter((r) => isFinite(r.lat) && isFinite(r.lon));

    return res.json(results);
  } catch (err) {
    console.error("LocationIQ error:", err?.response?.data || err.message);
    return res.status(502).json({ error: "Search failed. Try another query." });
  }
};
// delete an college
 

export const deleteCollege = async (req, res) => {
  try {
    const { id } = req.params;
    await College.findByIdAndDelete(id);
    return res.json({ success: true });
  } catch (err) {
    console.error("deleteCollege error:", err.message);
    return res.status(500).json({ error: "Failed to delete college" });
  }
};


//  POST /api/colleges/save
export const saveCollege = async (req, res) => {
  try {
    let { name, address, lat, lon } = req.body;
    lat = parseFloat(lat);
    lon = parseFloat(lon);

    if (!name || !address || !isFinite(lat) || !isFinite(lon)) {
      return res.status(400).json({ error: "Invalid payload" });
    }

    //  Always update lat/lon when saving
    const doc = await College.findOneAndUpdate(
      { name, address },
      { $set: { name, address, lat, lon } },
      { new: true, upsert: true }
    );

    console.log("Saved college:", doc.name, doc.lat, doc.lon);

    return res.json(doc);
  } catch (err) {
    console.error("saveCollege error:", err.message);
    return res.status(500).json({ error: "Failed to save college" });
  }
};

//  GET /api/colleges
export const getColleges = async (_req, res) => {
  try {
    const colleges = await College.find().sort({ createdAt: -1 });
    return res.json(colleges);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch colleges" });
  }
};

//  GET /api/colleges/distances/:id
export const getDistances = async (req, res) => {
  try {
    const selected = await College.findById(req.params.id);
    if (!selected) return res.status(404).json({ error: "College not found" });

    const others = await College.find({ _id: { $ne: selected._id } });

    console.log("Selected:", selected.name, selected.lat, selected.lon);
    others.forEach((c) =>
      console.log("Other:", c.name, c.lat, c.lon)
    );

    const distances = others.map((c) => {
      const km = haversineKm(selected.lat, selected.lon, c.lat, c.lon);
      return {
        id: c._id,
        name: c.name,
        address: c.address,
        distance_km: Number(km.toFixed(2)),
      };
    });

    distances.sort((a, b) => a.distance_km - b.distance_km);

    return res.json({
      selected: {
        id: selected._id,
        name: selected.name,
        address: selected.address,
      },
      distances,
    });
  } catch (err) {
    console.error("getDistances error:", err.message);
    return res.status(500).json({ error: "Failed to calculate distances" });
  }
};
