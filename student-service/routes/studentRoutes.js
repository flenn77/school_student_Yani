// studentRoutes.js
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Student = require("../models/student");
const { getAllSchools } = require("../services/schoolService"); // Nouvelle fonction

// CREATE
router.post("/", async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL (Optimisé avec récupération groupée des écoles)
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();

    // Récupérer toutes les écoles en une seule requête
    const schools = await getAllSchools();
    const schoolMap = schools.reduce((map, school) => {
      map[school.id] = school;
      return map;
    }, {});

    // Associer chaque étudiant à son école
    const studentsWithSchools = students.map(student => ({
      ...student.toObject(),
      school: schoolMap[student.schoolId] || null
    }));

    res.json(studentsWithSchools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ONE (Pas de changement, récupération de l'école au cas par cas)
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    let school = null;
    if (student.schoolId) {
      school = await getSchoolById(student.schoolId);
    }

    const studentWithSchool = {
      ...student.toObject(),
      school: school || null,
    };

    res.json({ student: studentWithSchool });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
