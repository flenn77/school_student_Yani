import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SchoolsView from '../views/SchoolsView.vue'
import StudentsView from '../views/StudentsView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/schools', name: 'schools', component: SchoolsView },
  { path: '/students', name: 'students', component: StudentsView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
