const { Booking } = require("../models/bookings");
const { v4: uuidv4 } = require("uuid");

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");
}

async function getBookingByCode(req, res) {
  try {
    const code = req.params.code;
    const b = await Booking.findOne({ where: { confirmation_code: code } });
    if (!b) return res.status(404).json({ error: "Booking not found" });
    return res.json(b);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function getBookingByEmail(req, res) {
  try {
    const email = req.params.email;
    if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email" });
    const bookings = await Booking.findAll({ where: { email }, order: [["id", "DESC"]] });
    return res.json(bookings);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function createBooking(req, res) {
  try {
    const { name, email, tickets } = req.body;
    const nb_tickets = parseInt(tickets, 10);
    if (!name?.trim()) return res.status(400).json({ error: "Name required" });
    if (!isValidEmail(email)) return res.status(400).json({ error: "Invalid email" });
    if (!Number.isFinite(nb_tickets) || nb_tickets < 1)
      return res.status(400).json({ error: "Tickets must be positive" });
    const confirmation_code = uuidv4();
    const created = await Booking.create({ name, email, nb_tickets, confirmation_code });
    return res.status(201).json(created);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  getBookingByCode,
  getBookingByEmail,
  createBooking,
};

