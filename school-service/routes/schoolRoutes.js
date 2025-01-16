const express = require("express");
const router = express.Router();
const Student = require("../models/student");

// CREATE
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    console.log("Tentative de suppression de l'étudiant ID :", req.params.id);
    
    const student = await Student.findByIdAndDelete(req.params.id);
    
    if (!student) {
      console.log("Étudiant non trouvé !");
      return res.status(404).json({ error: "Étudiant non trouvé" });
    }

    console.log("Étudiant supprimé avec succès !");
    res.status(204).end();
  } catch (err) {
    console.error("Erreur lors de la suppression :", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
