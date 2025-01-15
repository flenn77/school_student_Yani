const express = require("express");
const cors = require("cors"); // Import de cors
const mongoose = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 8082;
const SERVICE_NAME = "student-service";
const SERVICE_ID = `${SERVICE_NAME}-${PORT}`; // ID unique basé sur le port
const CONSUL_ADDRESS = process.env.CONSUL_HTTP_ADDR || "http://localhost:8500";

// Activer CORS avec une configuration explicite
app.use(
  cors({
    origin: "http://localhost:8080", // Autorise uniquement cette origine
    methods: "GET,POST,PUT,DELETE", // Méthodes autorisées
    allowedHeaders: "Content-Type,Authorization", // Headers autorisés
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
app.use("/students", studentRoutes);

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
      Address: "student-service",
      Port: PORT,
      Check: {
        HTTP: `http://student-service:${PORT}/health`,
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

// Connexion à MongoDB et démarrage du serveur
mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");
  await registerWithConsul();
  app.listen(PORT, () => {
    console.log(`Student service running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
