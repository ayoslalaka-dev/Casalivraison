const { Artist } = require("../models/artists");

async function listArtists(req, res) {
  try {
    const artists = await Artist.findAll({ order: [["id", "ASC"]] });
    return res.json(
      artists.map((a) => ({
        id: a.id,
        name: a.name,
        photoUrl: a.image_url,
        bio: a.bio,
        schedule: a.schedule_time,
      }))
    );
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function getArtist(req, res) {
  try {
    const id = req.params.id;
    const a = await Artist.findByPk(id);
    if (!a) return res.status(404).json({ error: "Artist not found" });
    return res.json({
      id: a.id,
      name: a.name,
      photoUrl: a.image_url,
      bio: a.bio,
      schedule: a.schedule_time,
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function createArtist(req, res) {
  try {
    const { name, genre, bio, schedule_time, image_url } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: "Name required" });
    const created = await Artist.create({ name, genre, bio, schedule_time, image_url });
    return res.status(201).json(created);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function updateArtist(req, res) {
  try {
    const id = req.params.id;
    const a = await Artist.findByPk(id);
    if (!a) return res.status(404).json({ error: "Artist not found" });
    const { name, genre, bio, schedule_time, image_url } = req.body;
    await a.update({ name, genre, bio, schedule_time, image_url });
    return res.json(a);
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

async function deleteArtist(req, res) {
  try {
    const id = req.params.id;
    const a = await Artist.findByPk(id);
    if (!a) return res.status(404).json({ error: "Artist not found" });
    await a.destroy();
    return res.status(204).send();
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  listArtists,
  getArtist,
  createArtist,
  updateArtist,
  deleteArtist,
};

