<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
    <h2 class="text-3xl font-bold mb-6 text-blue-600">Liste des étudiants</h2>

    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <table class="table-auto w-full max-w-5xl bg-white shadow-md rounded-lg mb-8">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2 text-left">Nom</th>
          <th class="px-4 py-2 text-left">Genre</th>
          <th class="px-4 py-2 text-left">School ID</th>
          <th class="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="student in students"
          :key="student._id"
          class="border-t hover:bg-gray-100"
        >
          <td class="px-4 py-2">{{ student.name }}</td>
          <td class="px-4 py-2">{{ student.genre }}</td>
          <td class="px-4 py-2">{{ student.schoolId }}</td>
          <td class="px-4 py-2 text-center space-x-2">
            <button
              @click="editStudent(student)"
              class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Modifier
            </button>
            <button
              @click="deleteStudent(student._id)"
              class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="w-full max-w-5xl bg-white shadow rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">
        {{ isEditing ? "Modifier un étudiant" : "Ajouter un étudiant" }}
      </h3>
      <form @submit.prevent="isEditing ? updateStudent() : addStudent()" class="space-y-4">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Nom"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
          <input
            id="genre"
            type="text"
            v-model="form.genre"
            required
            placeholder="Genre (M/F)"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label for="schoolId" class="block text-sm font-medium text-gray-700">ID de l'école</label>
          <input
            id="schoolId"
            type="number"
            v-model="form.schoolId"
            required
            placeholder="ID de l'école"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex justify-end space-x-2">
          <button
            type="submit"
            class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            {{ isEditing ? "Mettre à jour" : "Ajouter" }}
          </button>
          <button
            type="button"
            @click="resetForm"
            v-if="isEditing"
            class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/api.js";

export default {
  name: "StudentsView",
  data() {
    return {
      students: [],
      form: {
        _id: null,
        name: "",
        genre: "",
        schoolId: "",
      },
      isEditing: false,
      error: null,
    };
  },
  async mounted() {
    await this.fetchStudents();
  },
  methods: {
    async fetchStudents() {
      try {
        const response = await getAllStudents();
        this.students = response.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async addStudent() {
      try {
        await createStudent(this.form);
        this.resetForm();
        await this.fetchStudents();
      } catch (err) {
        this.error = err.message;
      }
    },
    editStudent(student) {
      this.form = { ...student };
      this.isEditing = true;
    },
    async updateStudent() {
      try {
        await updateStudent(this.form._id, this.form);
        this.resetForm();
        await this.fetchStudents();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteStudent(id) {
      try {
        await deleteStudent(id);
        await this.fetchStudents();
      } catch (err) {
        this.error = "Erreur lors de la suppression.";
      }
    },
    resetForm() {
      this.form = { _id: null, name: "", genre: "", schoolId: "" };
      this.isEditing = false;
    },
  },
};
</script>
