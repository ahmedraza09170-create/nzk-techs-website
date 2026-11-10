const crypto = require("crypto");

const COOKIE = "nzk_admin";
const MAX_AGE_MS = 8 * 60 * 60 * 1000; // 8 hours

const secret = () => process.env.SESSION_SECRET || "";
const sign = payload => crypto.createHmac("sha256", secret()).update(payload).digest("base64url");

function safeEqual(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

function createToken() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now() + MAX_AGE_MS })).toString("base64url");
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token) {
  if (!token || secret().length < 16) return false;
  const [payload, sig] = String(token).split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  try { return JSON.parse(Buffer.from(payload, "base64url").toString()).exp > Date.now(); }
  catch { return false; }
}

function readCookie(req, name) {
  const raw = req.headers.cookie || "";
  for (const part of raw.split(";")) {
    const i = part.indexOf("=");
    if (i > -1 && part.slice(0, i).trim() === name) return decodeURIComponent(part.slice(i + 1).trim());
  }
  return "";
}

function setSessionCookie(res) {
  res.cookie(COOKIE, createToken(), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: MAX_AGE_MS,
    path: "/"
  });
}

const clearSessionCookie = res => res.clearCookie(COOKIE, { path: "/" });

module.exports = { COOKIE, safeEqual, setSessionCookie, clearSessionCookie, verifyToken, readCookie };
