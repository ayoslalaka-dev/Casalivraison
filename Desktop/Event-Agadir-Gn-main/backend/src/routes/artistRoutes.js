const express = require("express");
const {
  listArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
} = require("../controllers/artistController");
const { requireAdmin } = require("../middleware/auth");
const router = express.Router();

/**
 * @swagger
 * /artists:
 *   get:
 *     summary: Retrieve a list of artists
 *     tags: [Artists]
 *     responses:
 *       200:
 *         description: A list of artists
 */
router.get("/", listArtists);

/**
 * @swagger
 * /artists/{id}:
 *   get:
 *     summary: Get an artist by ID
 *     tags: [Artists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artist data
 *       404:
 *         description: Artist not found
 */
router.get("/:id", getArtist);

router.post("/", requireAdmin, createArtist);
router.put("/:id", requireAdmin, updateArtist);
router.delete("/:id", requireAdmin, deleteArtist);

module.exports = router;

