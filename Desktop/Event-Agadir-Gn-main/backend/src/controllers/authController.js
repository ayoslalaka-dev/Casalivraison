const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;
    if (!adminEmail || !adminHash) {
      return res.status(500).json({ error: "Admin credentials not configured" });
    }
    if (email !== adminEmail) return res.status(401).json({ error: "Unauthorized" });
    const ok = await bcrypt.compare(password || "", adminHash);
    if (!ok) return res.status(401).json({ error: "Unauthorized" });
    const token = jwt.sign({ role: "admin", email }, process.env.JWT_SECRET || "dev-secret", {
      expiresIn: "2h",
    });
    return res.json({ token });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { login };

