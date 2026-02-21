const { EventInfo } = require("../models/event_info");

async function getEvent(req, res) {
  try {
    const event = await EventInfo.findOne();
    if (!event) return res.status(404).json({ error: "Event not found" });
    return res.json({
      id: event.id,
      title: event.name,
      date: event.date,
      location: event.location,
      description: event.description,
      bannerUrl: event.banner_url,
    });
  } catch (e) {
    return res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getEvent };

