<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div id="app" class="grey lighten-5">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/profile">Profile</router-link>
    </div>
  </div>
  <router-view />
</template>

<style scoped>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

#nav {
  padding: 1em;
  }

a {
  color: black;
}
</style>
