require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./src/config/db");
const eventRoutes = require("./src/routes/eventRoutes");
const artistRoutes = require("./src/routes/artistRoutes");
const bookingRoutes = require("./src/routes/bookingRoutes");
const authRoutes = require("./src/routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/config/swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/event", eventRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de La Grande Soirée Gnawa !");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Quelque chose a mal tourné!" });
});

sequelize
  .authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur lancé sur http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Impossible de se connecter à la base de données :", err);
  });
