import { useState, useEffect } from "react";
import { getAllSchools, createSchool, updateSchool, deleteSchool } from "../src/app/services/api"; // ✅ Ajout d'updateSchool

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const [form, setForm] = useState({ id: null, name: "", adress: "", directorName: "" });

  // Charge les écoles au démarrage
  useEffect(() => {
    fetchSchools();
  }, []);

  async function fetchSchools() {
    try {
      const response = await getAllSchools();
      setSchools(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async function addSchool() {
    try {
      await createSchool(form);
      fetchSchools();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  async function updateSchoolHandler() { // ✅ Renommage de la fonction
    try {
      await updateSchool(form.id, form);  // ✅ Correction : Appeler la bonne fonction API
      fetchSchools();
      resetForm();
    } catch (error) {
      console.error(error);
    }
  }

  async function removeSchool(id) {
    try {
      await deleteSchool(id);
      fetchSchools();
    } catch (error) {
      console.error(error);
    }
  }

  function resetForm() {
    setForm({ id: null, name: "", adress: "", directorName: "" });
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">Liste des écoles</h2>
      <button className="btn btn-primary mb-3" onClick={addSchool}>Ajouter une école</button>

      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Adresse</th>
            <th>Directeur</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {schools.map((school) => (
            <tr key={school.id}>
              <td>{school.name}</td>
              <td>{school.adress}</td>
              <td>{school.directorName}</td>
              <td>
                <button onClick={() => setForm(school)} className="btn btn-warning btn-sm mr-2">Modifier</button>
                <button onClick={() => removeSchool(school.id)} className="btn btn-danger btn-sm">Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="card shadow-sm p-4">
        <h3>{form.id ? "Modifier" : "Ajouter"} une école</h3>
        <form onSubmit={(e) => { 
            e.preventDefault(); // ✅ Empêcher le rechargement de la page
            form.id ? updateSchoolHandler() : addSchool();
        }}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom de l'école</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              placeholder="Nom de l'école"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="adress" className="form-label">Adresse</label>
            <input
              id="adress"
              type="text"
              value={form.adress}
              onChange={(e) => setForm({ ...form, adress: e.target.value })}
              required
              placeholder="Adresse"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="directorName" className="form-label">Nom du directeur</label>
            <input
              id="directorName"
              type="text"
              value={form.directorName}
              onChange={(e) => setForm({ ...form, directorName: e.target.value })}
              required
              placeholder="Nom du directeur"
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary me-2">
              {form.id ? "Mettre à jour" : "Ajouter"}
            </button>
            <button type="button" onClick={resetForm} className="btn btn-secondary">Annuler</button>
          </div>
        </form>
      </div>
    </div>
  );
}
