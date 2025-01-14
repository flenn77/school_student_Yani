<template>
  <div id="app">
    <h1>Vue Front - Microservices Demo</h1>
    
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/schools">Schools</router-link> |
      <router-link to="/students">Students</router-link>
    </nav>

    <hr />

    <!-- Affichage du composant en fonction de la route -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  padding: 20px;
  font-family: sans-serif;
}
nav {
  margin-bottom: 10px;
}
</style>
