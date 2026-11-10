require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");

const contactRoutes = require("./routes/contact");
const adminRoutes = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 5000;
const SITE_DIR = path.join(__dirname, ".."); // the HTML/CSS/JS website folder

app.set("trust proxy", 1);

// Security headers. CSP is off because the site loads Bootstrap/AOS/fonts from CDNs.
app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

// CORS: only needed if the HTML is opened from another port (e.g. VS Code Live Server).
const allowed = (process.env.CLIENT_ORIGINS || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: (origin, cb) => cb(null, !origin || allowed.includes(origin)) }));

app.use(express.json({ limit: "20kb" }));

// ---------- API ----------
app.get("/api/health", (req, res) => res.json({ ok: true, db: mongoose.connection.readyState === 1 }));
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", (req, res) => res.status(404).json({ ok: false, message: "Not found." }));

// ---------- Website (static files) ----------
// Never expose the backend folder or secret files.
app.use((req, res, next) => {
  if (/^\/server(\/|$)/i.test(req.path) || /(^|\/)\.env/i.test(req.path)) return res.sendStatus(404);
  next();
});
// Admin panel pages (/admin). The pages are only a shell, all data comes from the protected /api/admin routes.
app.get("/admin", (req, res) => res.sendFile(path.join(SITE_DIR, "admin", "index.html")));
app.get("/admin/login", (req, res) => res.sendFile(path.join(SITE_DIR, "admin", "login.html")));
app.use(express.static(SITE_DIR, { extensions: ["html"], dotfiles: "ignore" }));

// ---------- Start ----------
async function start() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is missing. Copy .env.example to .env and set it.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 8000 });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
  app.listen(PORT, () => console.log(`NZK Techs running: http://localhost:${PORT}`));
}
start();
