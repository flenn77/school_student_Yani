const express = require("express");
const cors = require("cors");
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
    origin: "http://localhost:3000", // Autorise uniquement cette origine
    methods: "GET,POST,PUT,DELETE", // Méthodes autorisées
    allowedHeaders: "Content-Type,Authorization", // Headers autorisés
  })
);

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

process.on("SIGINT", async () => {
  await deregisterFromConsul();
  process.exit();
});

mongoose.connection.on("connected", async () => {
  console.log("Connected to MongoDB");
  await registerWithConsul();
  app.listen(PORT, () => {
    console.log(`Student service running on http://0.0.0.0:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
