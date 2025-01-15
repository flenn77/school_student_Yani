const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");
const schoolRoutes = require("./routes/schoolRoutes");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8081;
const SERVICE_NAME = "school-service";
const SERVICE_ID = `${SERVICE_NAME}-${PORT}`; // Un ID unique basé sur le port pour gérer plusieurs instances
const CONSUL_ADDRESS = process.env.CONSUL_HTTP_ADDR || "http://localhost:8500";

// Activer CORS avec une configuration explicite
app.use(
  cors({
    origin: "http://localhost:8080",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

// Middleware pour ajouter manuellement les en-têtes si nécessaire
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use("/schools", schoolRoutes);

// Route de health check pour Consul
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP", timestamp: new Date() });
});

// Enregistrer le service auprès de Consul
async function registerWithConsul() {
  try {
    const registrationData = {
      Name: SERVICE_NAME,
      ID: SERVICE_ID,
      Address: "school-service",
      Port: PORT,
      Check: {
        HTTP: `http://school-service:${PORT}/health`,
        Interval: "10s",
        Timeout: "5s",
      },
    };
    await axios.put(`${CONSUL_ADDRESS}/v1/agent/service/register`, registrationData);
    console.log(`Service ${SERVICE_ID} registered with Consul`);
  } catch (err) {
    console.error(`Failed to register service with Consul: ${err.message}`);
  }
}

// Retirer le service de Consul lors de l'arrêt
async function deregisterFromConsul() {
  try {
    await axios.put(`${CONSUL_ADDRESS}/v1/agent/service/deregister/${SERVICE_ID}`);
    console.log(`Service ${SERVICE_ID} deregistered from Consul`);
  } catch (err) {
    console.error(`Failed to deregister service from Consul: ${err.message}`);
  }
}

process.on("SIGINT", async () => {
  await deregisterFromConsul();
  process.exit();
});

// Synchronisation de la base de données et démarrage du service
sequelize
  .sync()
  .then(async () => {
    console.log("Connected to PostgreSQL and synced models");
    await registerWithConsul();
    app.listen(PORT, () => {
      console.log(`School service running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Unable to connect to the database: ${err.message}`);
  });
