const express = require("express");
const {
  getBookingByCode,
  getBookingByEmail,
  createBooking,
} = require("../controllers/bookingController");
const router = express.Router();

/**
 * @swagger
 * /bookings/{code}:
 *   get:
 *     summary: Get booking by confirmation code
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Not found
 */
router.get("/:code", getBookingByCode);

/**
 * @swagger
 * /bookings/email/{email}:
 *   get:
 *     summary: Get bookings by user email
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get("/email/:email", getBookingByEmail);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - tickets
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               tickets:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post("/", createBooking);

module.exports = router;

