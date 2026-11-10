const express = require("express");
const rateLimit = require("express-rate-limit");
const Contact = require("../models/Contact");
const adminAuth = require("../middleware/adminAuth");
const { sendContactEmails } = require("../utils/mailer");

const router = express.Router();

// Max 5 messages per 15 minutes from one IP (stops spam).
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, message: "Too many messages. Please try again in a few minutes." }
});

const clean = v => String(v == null ? "" : v).replace(/[<>]/g, "").trim();

// POST /api/contact  -> save a new enquiry
router.post("/", limiter, async (req, res) => {
  try {
    const body = req.body || {};

    // Honeypot: real users never fill this hidden field. Bots do. Pretend success.
    if (clean(body.website)) return res.status(201).json({ ok: true, message: "Thank you!" });

    const data = {
      name: clean(body.name),
      phone: clean(body.phone),
      email: clean(body.email).toLowerCase(),
      message: clean(body.message)
    };

    const errors = {};
    if (data.name.length < 2 || data.name.length > 80) errors.name = "Please enter your name.";
    const digits = (data.phone.match(/\d/g) || []).length;
    if (!/^[0-9+\-()\s]{7,20}$/.test(data.phone) || digits < 7) errors.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) || data.email.length > 120) errors.email = "Please enter a valid email address.";
    if (data.message.length < 10 || data.message.length > 2000) errors.message = "Message must be 10 to 2000 characters.";

    if (Object.keys(errors).length) {
      return res.status(400).json({ ok: false, message: "Please check the form.", errors });
    }

    const saved = await Contact.create({ ...data, ip: req.ip });

    // Send both emails in the background. The visitor gets the success message right away,
    // and a mail problem can never make the form fail (the data is already saved).
    sendContactEmails(saved)
      .then(r => Contact.updateOne({ _id: saved._id }, { userEmailSent: r.userSent, teamEmailSent: r.teamSent }))
      .catch(err => console.error("Email job error:", err.message));

    return res.status(201).json({ ok: true, message: "Thank you! Your message has been received. Our team will contact you soon." });
  } catch (err) {
    console.error("Contact save error:", err.message);
    return res.status(500).json({ ok: false, message: "Something went wrong on our side. Please try again or use WhatsApp." });
  }
});

// GET /api/contact  -> read messages (admin only, needs x-admin-key header)
router.get("/", adminAuth, async (req, res) => {
  try {
    const items = await Contact.find().sort({ createdAt: -1 }).limit(200).lean();
    res.json({ ok: true, count: items.length, items });
  } catch (err) {
    res.status(500).json({ ok: false, message: "Could not load messages." });
  }
});

module.exports = router;
