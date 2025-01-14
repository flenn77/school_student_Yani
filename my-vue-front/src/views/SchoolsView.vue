<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
    <h2 class="text-3xl font-bold mb-6 text-blue-600">Liste des écoles</h2>

    <!-- Message d'erreur -->
    <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>

    <!-- Tableau des écoles -->
    <table class="table-auto w-full max-w-3xl mb-8 bg-white shadow-lg rounded-lg">
      <thead class="bg-gray-200">
        <tr>
          <th class="px-4 py-2 text-left">Nom</th>
          <th class="px-4 py-2 text-left">Adresse</th>
          <th class="px-4 py-2 text-left">Directeur</th>
          <th class="px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="school in schools"
          :key="school.id"
          class="border-t border-gray-300 hover:bg-gray-100"
        >
          <td class="px-4 py-2">{{ school.name }}</td>
          <td class="px-4 py-2">{{ school.adress }}</td>
          <td class="px-4 py-2">{{ school.directorName }}</td>
          <td class="px-4 py-2 text-center space-x-2">
            <button
              @click="editSchool(school)"
              class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Modifier
            </button>
            <button
              @click="deleteSchool(school.id)"
              class="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
            >
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Formulaire -->
    <div class="w-full max-w-3xl bg-white shadow rounded-lg p-6">
      <h3 class="text-xl font-semibold mb-4">
        {{ isEditing ? "Modifier une école" : "Ajouter une école" }}
      </h3>
      <form @submit.prevent="isEditing ? updateSchool() : addSchool()" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">
            Nom de l'école
          </label>
          <input
            id="name"
            type="text"
            v-model="form.name"
            required
            placeholder="Nom de l'école"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label for="adress" class="block text-sm font-medium text-gray-700">
            Adresse
          </label>
          <input
            id="adress"
            type="text"
            v-model="form.adress"
            required
            placeholder="Adresse"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div>
          <label for="directorName" class="block text-sm font-medium text-gray-700">
            Nom du directeur
          </label>
          <input
            id="directorName"
            type="text"
            v-model="form.directorName"
            required
            placeholder="Nom du directeur"
            class="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <div class="flex justify-end space-x-4">
          <button
            type="submit"
            class="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            {{ isEditing ? "Mettre à jour" : "Ajouter" }}
          </button>
          <button
            type="button"
            @click="resetForm"
            v-if="isEditing"
            class="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
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
  getAllSchools,
  createSchool,
  updateSchool,
  deleteSchool,
} from "../services/api.js";

export default {
  name: "SchoolsView",
  data() {
    return {
      schools: [],
      form: {
        id: null,
        name: "",
        adress: "",
        directorName: "",
      },
      isEditing: false,
      error: null,
    };
  },
  async mounted() {
    await this.fetchSchools();
  },
  methods: {
    async fetchSchools() {
      try {
        const response = await getAllSchools();
        this.schools = response.data;
      } catch (err) {
        this.error = err.message;
      }
    },
    async addSchool() {
      try {
        await createSchool(this.form);
        this.resetForm();
        await this.fetchSchools();
      } catch (err) {
        this.error = err.message;
      }
    },
    editSchool(school) {
      this.form = { ...school };
      this.isEditing = true;
    },
    async updateSchool() {
      try {
        await updateSchool(this.form.id, this.form);
        this.resetForm();
        await this.fetchSchools();
      } catch (err) {
        this.error = err.message;
      }
    },
    async deleteSchool(id) {
      try {
        await deleteSchool(id);
        await this.fetchSchools();
      } catch (err) {
        this.error = err.message;
      }
    },
    resetForm() {
      this.form = { id: null, name: "", adress: "", directorName: "" };
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
