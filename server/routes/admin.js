const express = require("express");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const Contact = require("../models/Contact");
const adminSession = require("../middleware/adminSession");
const { safeEqual, setSessionCookie, clearSessionCookie, verifyToken, readCookie, COOKIE } = require("../utils/session");

const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many login attempts. Try again in 15 minutes." }
});

const escRegex = s => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const validId = id => mongoose.Types.ObjectId.isValid(id);

/* ---------- auth ---------- */
router.post("/login", loginLimiter, (req, res) => {
  const user = process.env.ADMIN_USER || "";
  const pass = process.env.ADMIN_PASSWORD || "";
  if (pass.length < 8 || (process.env.SESSION_SECRET || "").length < 16) {
    return res.status(500).json({ ok: false, message: "Admin is not configured. Set ADMIN_USER, ADMIN_PASSWORD and SESSION_SECRET in .env." });
  }
  const { username = "", password = "" } = req.body || {};
  const okUser = safeEqual(String(username), user);
  const okPass = safeEqual(String(password), pass);
  if (!(okUser && okPass)) return res.status(401).json({ ok: false, message: "Wrong username or password." });
  setSessionCookie(res);
  res.json({ ok: true });
});

router.post("/logout", (req, res) => { clearSessionCookie(res); res.json({ ok: true }); });

router.get("/me", (req, res) => {
  res.json({ ok: verifyToken(readCookie(req, COOKIE)) });
});

/* ---------- everything below needs a login ---------- */
router.use(adminSession);

// GET /api/admin/stats
router.get("/stats", async (req, res) => {
  try {
    const startToday = new Date(); startToday.setHours(0, 0, 0, 0);
    const [total, fresh, read, replied, today] = await Promise.all([
      Contact.countDocuments(),
      Contact.countDocuments({ status: "new" }),
      Contact.countDocuments({ status: "read" }),
      Contact.countDocuments({ status: "replied" }),
      Contact.countDocuments({ createdAt: { $gte: startToday } })
    ]);
    // Last 7 days (oldest first) for the dashboard chart.
    const since = new Date(startToday); since.setDate(since.getDate() - 6);
    const agg = await Contact.aggregate([
      { $match: { createdAt: { $gte: since } } },
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, n: { $sum: 1 } } }
    ]);
    const map = Object.fromEntries(agg.map(r => [r._id, r.n]));
    const trend = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(since); d.setDate(since.getDate() + i);
      const key = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
      trend.push({ date: key, label: d.toLocaleDateString("en-GB", { weekday: "short" }), n: map[key] || 0 });
    }
    res.json({ ok: true, stats: { total, new: fresh, read, replied, today }, trend });
  } catch { res.status(500).json({ ok: false, message: "Could not load stats." }); }
});

function buildFilter(q) {
  const filter = {};
  if (["new", "read", "replied"].includes(q.status)) filter.status = q.status;
  const s = String(q.search || "").trim().slice(0, 80);
  if (s) {
    const rx = new RegExp(escRegex(s), "i");
    filter.$or = [{ name: rx }, { email: rx }, { phone: rx }, { message: rx }];
  }
  return filter;
}

// GET /api/admin/contacts?status=&search=&page=1&limit=20
router.get("/contacts", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const filter = buildFilter(req.query);
    const [items, total] = await Promise.all([
      Contact.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
      Contact.countDocuments(filter)
    ]);
    res.json({ ok: true, items, total, page, pages: Math.max(1, Math.ceil(total / limit)) });
  } catch { res.status(500).json({ ok: false, message: "Could not load messages." }); }
});

// GET /api/admin/export.csv  (opens in Excel)
router.get("/export.csv", async (req, res) => {
  try {
    const items = await Contact.find(buildFilter(req.query)).sort({ createdAt: -1 }).lean();
    const cell = v => {
      let t = String(v == null ? "" : v);
      if (/^[=+\-@]/.test(t)) t = "'" + t; // stop spreadsheet formula injection
      return `"${t.replace(/"/g, '""')}"`;
    };
    const rows = [["Date", "Name", "Phone", "Email", "Message", "Status", "Note"]];
    items.forEach(c => rows.push([new Date(c.createdAt).toISOString(), c.name, c.phone, c.email, c.message, c.status, c.note]));
    res.setHeader("Content-Type", "text/csv; charset=utf-8");
    res.setHeader("Content-Disposition", 'attachment; filename="nzk-enquiries.csv"');
    res.send("\uFEFF" + rows.map(r => r.map(cell).join(",")).join("\r\n"));
  } catch { res.status(500).send("Export failed."); }
});

// PATCH /api/admin/contacts/:id   { status?, note? }
router.patch("/contacts/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ ok: false, message: "Invalid id." });
    const update = {};
    if (req.body.status !== undefined) {
      if (!["new", "read", "replied"].includes(req.body.status)) return res.status(400).json({ ok: false, message: "Invalid status." });
      update.status = req.body.status;
    }
    if (req.body.note !== undefined) update.note = String(req.body.note).slice(0, 1000);
    const item = await Contact.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
    if (!item) return res.status(404).json({ ok: false, message: "Not found." });
    res.json({ ok: true, item });
  } catch { res.status(500).json({ ok: false, message: "Could not update." }); }
});

// DELETE /api/admin/contacts/:id
router.delete("/contacts/:id", async (req, res) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ ok: false, message: "Invalid id." });
    const r = await Contact.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ ok: false, message: "Not found." });
    res.json({ ok: true });
  } catch { res.status(500).json({ ok: false, message: "Could not delete." }); }
});

module.exports = router;
