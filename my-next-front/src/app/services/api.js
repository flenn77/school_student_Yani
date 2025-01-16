import axios from "axios";

const API_SCHOOL = "http://school-service:8081";
const API_STUDENT = "http://localhost:8082";

// API pour les écoles
export async function getAllSchools() {
  const response = await axios.get(`${API_SCHOOL}/schools`);
  return response;
}

export async function createSchool(data) {
  const response = await axios.post(`${API_SCHOOL}/schools`, data);
  return response;
}

export async function updateSchool(id, data) {
  const response = await axios.put(`${API_SCHOOL}/schools/${id}`, data);
  return response;
}

export async function deleteSchool(id) {
  const response = await axios.delete(`${API_SCHOOL}/schools/${id}`);
  return response;
}

// API pour les étudiants
export async function getAllStudents() {
  const response = await axios.get(`${API_STUDENT}/students`);
  return response;
}

export async function createStudent(data) {
  const response = await axios.post(`${API_STUDENT}/students`, data);
  return response;
}

export async function updateStudent(id, data) {
  const response = await axios.put(`${API_STUDENT}/students/${id}`, data);
  return response;
}

export async function deleteStudent(id) {
  console.log("Tentative de suppression de l'étudiant :", id);
  try {
    const response = await axios.delete(`${API_STUDENT}/students/${id}`);
    console.log("Étudiant supprimé :", response.data);
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression de l'étudiant :", error.response?.data || error.message);
    throw error;
  }
}
