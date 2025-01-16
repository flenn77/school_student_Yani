import { useState, useEffect } from "react";
import { getAllStudents, createStudent, deleteStudent, updateStudent } from "../src/app/services/api";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", genre: "", schoolId: "" });

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    try {
      const response = await getAllStudents();
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addOrUpdateStudent(e) {
    e.preventDefault();
    try {
      if (form.id) {
        await updateStudent(form.id, form);
      } else {
        await createStudent(form);
      }
      fetchStudents();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeStudent(id) {
    console.log("Tentative de suppression de l'étudiant :", id);
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'étudiant :", error);
    }
  }

  function resetForm() {
    setForm({ id: null, name: "", genre: "", schoolId: "" });
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">Liste des étudiants</h2>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Genre</th>
            <th>École ID</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.genre}</td>
              <td>{student.schoolId}</td>
              <td>
                <button onClick={() => setForm(student)} className="btn btn-warning btn-sm mr-2">
                  Modifier
                </button>
                <button onClick={() => removeStudent(student._id)} className="btn btn-danger btn-sm">
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card shadow-sm p-4">
        <h3>{form.id ? "Modifier" : "Ajouter"} un étudiant</h3>
        <form onSubmit={addOrUpdateStudent}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom de l'étudiant</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Nom de l'étudiant"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="genre" className="form-label">Genre</label>
            <input
              id="genre"
              type="text"
              value={form.genre}
              onChange={(e) => setForm({ ...form, genre: e.target.value })}
              required
              placeholder="Genre"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="schoolId" className="form-label">ID de l'école</label>
            <input
              id="schoolId"
              type="number"
              value={form.schoolId}
              onChange={(e) => setForm({ ...form, schoolId: e.target.value })}
              required
              placeholder="ID de l'école"
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">
              {form.id ? "Mettre à jour" : "Ajouter"}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
