<template>
  <div id="app" class="grey lighten-5">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span>|</span>
      <router-link to="/profile">Profile</router-link>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  data() {
    return {
      useTheme: false,
    };
  },

  mounted() {
    const jsonValue = localStorage.getItem("theme");
    const theme = JSON.parse(jsonValue);

    this.useTheme = theme;
  },
};
</script>

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

span {
  margin: 10px;
}

a {
  color: black;
}
</style>
