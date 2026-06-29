import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { MongoMemoryServer } from "mongodb-memory-server";
import Complaint from "./models/Complaint.js";
import localStore from "./localStore.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/resolvehub";

const generateReference = () => `RH-${Math.floor(1000 + Math.random() * 9000)}`;
let dbAvailable = false;
const complaintCache = [];

app.use(cors());
app.use(express.json());

const flushCachedComplaints = async () => {
  if (!dbAvailable || complaintCache.length === 0) return;

  const cached = [...complaintCache];
  complaintCache.length = 0;

  for (const item of cached) {
    try {
      const complaint = new Complaint(item);
      await complaint.save();
    } catch (error) {
      console.error("Failed to flush cached complaint:", item.reference, error.message);
      complaintCache.unshift(item);
      break;
    }
  }
};

let mongod = null;
const forceFileStorage = process.env.FORCE_FILE_STORAGE === "true";

const connectDatabase = async () => {
  if (forceFileStorage) {
    console.log("FORCE_FILE_STORAGE=true — using file-backed storage only (no Mongo attempts)");
    dbAvailable = false;
    return;
  }
  // If an explicit env URI is provided, try that first
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { autoIndex: true, serverSelectionTimeoutMS: 5000 });
      dbAvailable = true;
      console.log("Connected to MongoDB (env MONGODB_URI)");
      await flushCachedComplaints();
      return;
    } catch (error) {
      console.error("MongoDB (env) connection error:", error.message || error);
    }
  }

  // Try the configured mongoUri (default localhost)
  try {
    await mongoose.connect(mongoUri, { autoIndex: true, serverSelectionTimeoutMS: 5000 });
    dbAvailable = true;
    console.log("Connected to MongoDB");
    await flushCachedComplaints();
    return;
  } catch (error) {
    console.warn("MongoDB connection failed (host). Will attempt in-memory server.", error.message || error);
  }

  // Optionally start an in-memory MongoDB server as a fallback for development
  // Enable by setting USE_MEMORY_SERVER=true in your environment.
  if (process.env.USE_MEMORY_SERVER === "true") {
    try {
      if (!mongod) mongod = await MongoMemoryServer.create();
      const inMemoryUri = mongod.getUri();
      await mongoose.connect(inMemoryUri, { autoIndex: true });
      dbAvailable = true;
      console.log("Connected to in-memory MongoDB (mongodb-memory-server)");
      await flushCachedComplaints();
      return;
    } catch (error) {
      dbAvailable = false;
      console.error("In-memory MongoDB connection error:", error.message || error);
      console.warn("Running with file-backed localStore until a MongoDB instance is available.");
    }
  } else {
    console.log("Skipping mongodb-memory-server fallback (set USE_MEMORY_SERVER=true to enable)");
  }
};

await connectDatabase();
setInterval(connectDatabase, 15000);

app.get("/api/complaints", async (req, res) => {
  try {
    if (dbAvailable) {
      const complaints = await Complaint.find().sort({ _id: -1 });
      return res.json(complaints);
    }

    const cachedComplaints = await localStore.getAll();
    return res.json(cachedComplaints);
  } catch (error) {
    console.error("Fetch complaints error:", error.message || error);
    res.status(500).json({ message: "Failed to fetch complaints." });
  }
});

app.post("/api/complaints", async (req, res) => {
  const { name, email, category, priority, details } = req.body;

  if (!name || !email || !details) {
    return res.status(400).json({ message: "Name, email and details are required." });
  }

  const reference = generateReference();
  const newComplaint = new Complaint({
    reference,
    name,
    email,
    category,
    priority,
    details,
    status: "Submitted",
    date: new Date().toLocaleDateString("en-GB"),
  });

  try {
    if (dbAvailable) {
      await newComplaint.save();
      return res.status(201).json(newComplaint);
    }

    await localStore.addComplaint(newComplaint);
    return res.status(201).json(newComplaint);
  } catch (error) {
    console.error("Complaint create error:", error.message || error);
    res.status(500).json({ message: error.message || "Failed to create complaint." });
  }
});

app.patch("/api/complaints/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (dbAvailable) {
      const complaint = await Complaint.findById(id);
      if (!complaint) {
        return res.status(404).json({ message: "Complaint not found." });
      }

      complaint.status = status;
      await complaint.save();
      return res.json(complaint);
    }

    const cacheItem = await localStore.updateComplaintStatus(id, status);
    if (!cacheItem) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    return res.json(cacheItem);
  } catch (error) {
    console.error("Complaint status error:", error.message || error);
    res.status(500).json({ message: "Failed to update complaint status." });
  }
});

// Export stored complaints file (downloads JSON)
app.get("/api/complaints/export", async (req, res) => {
  try {
    const { fileURLToPath } = await import("url");
    const path = await import("path");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const dbPath = path.join(__dirname, "db", "complaints.json");

    res.download(dbPath, "complaints.json", (err) => {
      if (err) {
        res.status(500).json({ message: "Failed to download complaints file." });
      }
    });
  } catch (error) {
    console.error("Export error:", error.message || error);
    res.status(500).json({ message: "Failed to export complaints." });
  }
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, mongo: dbAvailable });
});

app.listen(port, () => {
  console.log(`ResolveHub backend running on http://localhost:${port}`);
});
