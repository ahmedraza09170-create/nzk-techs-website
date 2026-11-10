const crypto = require("crypto");

// Very simple protection for the "read messages" route.
module.exports = function adminAuth(req, res, next) {
  const key = process.env.ADMIN_KEY || "";
  const sent = String(req.get("x-admin-key") || "");
  const a = Buffer.from(sent);
  const b = Buffer.from(key);
  const ok = key.length >= 12 && a.length === b.length && crypto.timingSafeEqual(a, b);
  if (!ok) return res.status(401).json({ ok: false, message: "Unauthorized." });
  next();
};
