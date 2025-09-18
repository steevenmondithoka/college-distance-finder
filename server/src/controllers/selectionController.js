import College from "../models/College.js";
import { haversineKm } from "../utils/haversine.js";

export const getDistances = async (req, res) => {
  try {
    const selected = await College.findById(req.params.id);
    if (!selected) return res.status(404).json({ error: "College not found" });

    const others = await College.find({ _id: { $ne: selected._id } });

    //  Debugging logs
    console.log(">>> Selected:", selected.name, selected.lat, selected.lon, typeof selected.lat, typeof selected.lon);
    others.forEach((c) => {
      console.log(">>> Other:", c.name, c.lat, c.lon, typeof c.lat, typeof c.lon);
    });

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
