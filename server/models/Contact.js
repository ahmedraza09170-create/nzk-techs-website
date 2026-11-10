const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 80 },
    phone: { type: String, required: true, trim: true, maxlength: 20 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 120 },
    message: { type: String, required: true, trim: true, minlength: 10, maxlength: 2000 },
    status: { type: String, enum: ["new", "read", "replied"], default: "new" },
    note: { type: String, default: "", maxlength: 1000 },       // internal note written in admin panel
    userEmailSent: { type: Boolean, default: false },
    teamEmailSent: { type: Boolean, default: false },
    ip: { type: String, default: "" }
  },
  { timestamps: true }
);

contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });

module.exports = mongoose.model("Contact", contactSchema);
