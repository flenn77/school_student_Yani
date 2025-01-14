const express = require("express");
const cors = require("cors"); // Import de cors
const mongoose = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 8082;

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

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Student service running on port ${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
