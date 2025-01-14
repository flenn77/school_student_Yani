const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: String,
  genre: String,
  schoolId: Number, // l'id de l'école
});

module.exports = mongoose.model("Student", studentSchema);
