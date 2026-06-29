import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbDir = path.join(__dirname, "db");
const dbPath = path.join(dbDir, "complaints.json");

const ensureDataFile = async () => {
  try {
    await fs.mkdir(dbDir, { recursive: true });
    await fs.access(dbPath);
  } catch {
    await fs.writeFile(dbPath, "[]", "utf8");
  }
};

const readData = async () => {
  try {
    await ensureDataFile();
    const content = await fs.readFile(dbPath, "utf8");
    return JSON.parse(content || "[]");
  } catch (error) {
    console.error("localStore read error:", error.message || error);
    await fs.writeFile(dbPath, "[]", "utf8");
    return [];
  }
};

const writeData = async (data) => {
  await ensureDataFile();
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2), "utf8");
};

const getAll = async () => {
  return await readData();
};

const saveAll = async (items) => {
  await writeData(items);
};

const addComplaint = async (complaint) => {
  const items = await readData();
  items.unshift(complaint);
  await writeData(items);
};

const updateComplaintStatus = async (id, status) => {
  const items = await readData();
  const item = items.find((item) => item.reference === id || item.id === id || item._id === id);
  if (!item) return null;
  item.status = status;
  await writeData(items);
  return item;
};

export default {
  getAll,
  saveAll,
  addComplaint,
  updateComplaintStatus,
};
