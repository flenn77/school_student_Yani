import axios from "axios";

const API_SCHOOL = "http://localhost:8081";
const API_STUDENT = "http://localhost:8082";

// Écoles
export async function getAllSchools() {
  return axios.get(`${API_SCHOOL}/schools`);
}

export async function createSchool(data) {
  return axios.post(`${API_SCHOOL}/schools`, data);
}

export async function updateSchool(id, data) {
  return axios.put(`${API_SCHOOL}/schools/${id}`, data);
}

export async function deleteSchool(id) {
  return axios.delete(`${API_SCHOOL}/schools/${id}`);
}

// Étudiants
export async function getAllStudents() {
  return axios.get(`${API_STUDENT}/students`);
}

export async function createStudent(data) {
  return axios.post(`${API_STUDENT}/students`, data);
}

export async function updateStudent(id, data) {
  return axios.put(`${API_STUDENT}/students/${id}`, data);
}

export async function deleteStudent(id) {
  return axios.delete(`${API_STUDENT}/students/${id}`);
}
