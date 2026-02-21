const express = require("express");
const { getEvent } = require("../controllers/eventController");
const router = express.Router();

/**
 * @swagger
 * /event:
 *   get:
 *     summary: Get main event details
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Event details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 date:
 *                   type: string
 *                 location:
 *                   type: string
 */
router.get("/", getEvent);

module.exports = router;

