const axios = require("axios");

async function getSchoolById(schoolId) {
  const baseUrl = process.env.SCHOOL_SERVICE_URL || "http://localhost:8081";
  
  try {
    const response = await axios.get(`${baseUrl}/schools/${schoolId}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération de l'école avec id=${schoolId}`, error.message);
    return null;
  }
}

module.exports = { getSchoolById };
