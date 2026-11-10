const { COOKIE, verifyToken, readCookie } = require("../utils/session");

module.exports = function adminSession(req, res, next) {
  if (verifyToken(readCookie(req, COOKIE))) return next();
  return res.status(401).json({ ok: false, message: "Please log in." });
};
