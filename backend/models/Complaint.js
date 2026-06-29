import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  category: { type: String, default: "Service quality" },
  priority: { type: String, default: "Normal" },
  details: { type: String, required: true },
  status: { type: String, default: "Submitted" },
  date: { type: String, required: true },
});

const Complaint = mongoose.model("Complaint", complaintSchema);
export default Complaint;
