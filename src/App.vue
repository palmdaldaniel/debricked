<template>
  <div class="app">
    <div id="nav" class="text-center">
      <router-link to="/">Home</router-link>
      <span>|</span>
      <router-link to="/profile">Profile</router-link>
    </div>
    <router-view />
  </div>
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
.app {
  height: 100vh;
}

#nav {
  padding: 1em;
}


span {
  margin: 10px;
}

a {
  color: black;
}
</style>
