import mongoose from "mongoose";

const SelectionSchema = new mongoose.Schema({
  college: { type: mongoose.Schema.Types.ObjectId, ref: "College", required: true },
  selectedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Selection", SelectionSchema);
