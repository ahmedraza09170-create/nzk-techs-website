const nodemailer = require("nodemailer");

const BRAND = {
  name: "NZK Techs",
  brown: "#493326",
  brown2: "#76543f",
  cream: "#f7f4ef",
  ink: "#171513",
  muted: "#77716b",
  line: "#e9e3dc"
};

const esc = v =>
  String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

let transporter = null;
function getTransporter() {
  if (transporter) return transporter;
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) return null;
  const port = Number(SMTP_PORT) || 465;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });
  return transporter;
}

const fromAddress = () =>
  `"${process.env.MAIL_FROM_NAME || BRAND.name}" <${process.env.SMTP_USER}>`;

/* ---------- shared layout (table based + inline CSS = works in Gmail/Outlook) ---------- */
function layout({ preheader, title, bodyHtml }) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title></head>
<body style="margin:0;padding:0;background:${BRAND.cream};font-family:Arial,Helvetica,sans-serif;color:${BRAND.ink};">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};padding:28px 12px;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid ${BRAND.line};">
    <tr><td style="background:${BRAND.brown};padding:28px 32px;">
      <div style="font-size:24px;font-weight:700;letter-spacing:.5px;color:#ffffff;">NZK <span style="color:#d9c3b0;">Techs</span></div>
      <div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#d9c3b0;margin-top:4px;">Websites &middot; Software &middot; AI &middot; Mobile Apps</div>
    </td></tr>
    <tr><td style="padding:34px 32px 28px;">${bodyHtml}</td></tr>
    <tr><td style="background:${BRAND.ink};padding:22px 32px;">
      <div style="font-size:13px;color:#ffffff;font-weight:700;">NZK Techs</div>
      <div style="font-size:12px;color:#b9b2ab;margin-top:4px;line-height:1.6;">Karachi &amp; Hyderabad, Pakistan &middot; Working remotely worldwide</div>
    </td></tr>
  </table>
  <div style="font-size:11px;color:${BRAND.muted};margin-top:14px;max-width:600px;">You are receiving this email because a message was submitted on our website.</div>
</td></tr></table></body></html>`;
}

const button = (href, label) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${BRAND.brown};color:#ffffff;text-decoration:none;font-weight:700;font-size:14px;padding:13px 26px;border-radius:999px;">${esc(label)}</a>`;

/* ---------- 1) Confirmation email to the visitor (ONLY the name, no other data) ---------- */
function userEmail(contact) {
  const wa = process.env.SITE_WHATSAPP || "923347127234";
  const phone = process.env.SITE_PHONE || "03347127234";
  const firstName = esc(String(contact.name).trim().split(/\s+/)[0]);
  const bodyHtml = `
    <h1 style="margin:0 0 14px;font-size:26px;line-height:1.25;color:${BRAND.brown};">Thank you, ${firstName}!</h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.7;color:${BRAND.ink};">We have received your message and a member of the NZK Techs team will review it carefully.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BRAND.cream};border-radius:12px;margin:22px 0;">
      <tr><td style="padding:20px 22px;">
        <div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.brown2};font-weight:700;margin-bottom:10px;">What happens next</div>
        <div style="font-size:14px;line-height:1.8;color:${BRAND.ink};">
          <b style="color:${BRAND.brown};">1.</b> Our team reads your enquiry.<br>
          <b style="color:${BRAND.brown};">2.</b> We contact you with the next steps, usually within 24 hours.<br>
          <b style="color:${BRAND.brown};">3.</b> We discuss your idea and prepare a clear plan for you.
        </div>
      </td></tr>
    </table>
    <p style="margin:0 0 22px;font-size:14px;line-height:1.7;color:${BRAND.muted};">If your matter is urgent, you can reach us directly on WhatsApp or by phone at ${esc(phone)}.</p>
    <div>${button("https://wa.me/" + wa, "Chat on WhatsApp")}</div>
    <p style="margin:28px 0 0;font-size:14px;line-height:1.7;color:${BRAND.ink};">Warm regards,<br><b style="color:${BRAND.brown};">Team NZK Techs</b></p>`;
  return {
    subject: "We received your message | NZK Techs",
    html: layout({ preheader: "Thank you for contacting NZK Techs. We will get back to you shortly.", title: "Thank you for contacting NZK Techs", bodyHtml }),
    text: `Thank you, ${String(contact.name).trim().split(/\s+/)[0]}!\n\nWe have received your message and our team will contact you soon, usually within 24 hours.\n\nUrgent? WhatsApp / call: ${phone}\n\nWarm regards,\nTeam NZK Techs`
  };
}

/* ---------- 2) Notification email to the team (full details) ---------- */
function teamEmail(contact, adminUrl) {
  const when = new Date(contact.createdAt || Date.now()).toLocaleString("en-GB", { timeZone: "Asia/Karachi", dateStyle: "medium", timeStyle: "short" });
  // Every detail is its own full-width block, so mail apps can never collapse the table into one field.
  const block = (label, value) =>
    `<tr><td style="padding:0 0 14px;">
       <div style="background:${BRAND.cream};border:1px solid ${BRAND.line};border-radius:12px;padding:14px 18px;">
         <div style="font-size:11px;text-transform:uppercase;letter-spacing:1.4px;color:${BRAND.brown2};font-weight:700;margin-bottom:5px;">${label}</div>
         <div style="font-size:16px;line-height:1.6;color:${BRAND.ink};">${value}</div>
       </div></td></tr>`;
  const bodyHtml = `
    <div style="display:inline-block;background:${BRAND.brown};color:#fff;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;font-weight:700;padding:6px 12px;border-radius:999px;margin-bottom:14px;">New enquiry</div>
    <h1 style="margin:0 0 6px;font-size:24px;color:${BRAND.ink};">${esc(contact.name)} sent a message</h1>
    <p style="margin:0 0 22px;font-size:13px;color:${BRAND.muted};">Received ${esc(when)} (PKT)</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${block("Full name", esc(contact.name))}
      ${block("Phone number", `<a href="tel:${esc(contact.phone)}" style="color:${BRAND.brown};font-weight:700;text-decoration:none;">${esc(contact.phone)}</a>`)}
      ${block("Email address", `<a href="mailto:${esc(contact.email)}" style="color:${BRAND.brown};font-weight:700;text-decoration:none;">${esc(contact.email)}</a>`)}
      ${block("Message", `<div style="white-space:pre-wrap;">${esc(contact.message)}</div>`)}
    </table>
    <div style="margin-top:12px;">${button(adminUrl, "Open in Admin Panel")}
      <a href="https://wa.me/${esc(String(contact.phone).replace(/\D/g, "").replace(/^0/, "92"))}" style="display:inline-block;margin-left:8px;color:${BRAND.brown};font-weight:700;font-size:14px;text-decoration:none;padding:13px 18px;">Reply on WhatsApp</a></div>`;
  return {
    subject: `New enquiry from ${String(contact.name).slice(0, 60)} | NZK Techs`,
    html: layout({ preheader: `${contact.name} | ${contact.phone} | ${String(contact.message).slice(0, 80)}`, title: "New website enquiry", bodyHtml }),
    text: `NEW ENQUIRY (${when} PKT)\n\nName: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}\n\nAdmin panel: ${adminUrl}`
  };
}

/* ---------- send both (never throws, so the form never fails because of email) ---------- */
async function sendContactEmails(contact) {
  const t = getTransporter();
  const result = { userSent: false, teamSent: false };
  if (!t) {
    console.warn("[mail] SMTP_USER / SMTP_PASS not set in .env, emails skipped.");
    return result;
  }
  const baseUrl = (process.env.PUBLIC_URL || `http://localhost:${process.env.PORT || 5000}`).replace(/\/$/, "");
  const teamTo = process.env.TEAM_EMAIL || process.env.SMTP_USER;

  try {
    const m = teamEmail(contact, `${baseUrl}/admin`);
    await t.sendMail({ from: fromAddress(), to: teamTo, replyTo: `"${String(contact.name).replace(/["\r\n]/g, "")}" <${contact.email}>`, subject: m.subject, html: m.html, text: m.text });
    result.teamSent = true;
  } catch (e) { console.error("[mail] team email failed:", e.message); }

  try {
    const m = userEmail(contact);
    await t.sendMail({ from: fromAddress(), to: contact.email, replyTo: teamTo, subject: m.subject, html: m.html, text: m.text });
    result.userSent = true;
  } catch (e) { console.error("[mail] visitor email failed:", e.message); }

  return result;
}

module.exports = { sendContactEmails, userEmail, teamEmail };
