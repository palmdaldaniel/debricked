<template>
  <div class="app">
    <div id="nav" class="text-center dark">
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

.dark {
  background-color: black;
}

span {
  margin: 10px;
  color: white
}

a {
  font-size: 1.1em;
  color: white;
}
</style>
