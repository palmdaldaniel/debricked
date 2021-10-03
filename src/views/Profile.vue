<template>
  <div class="wrapper" :class="useTheme ? 'grey darken-3' : 'grey lighten-5'">
    <div class="container">
      <a @click="themeSwitcher" class="waves-effect waves-light btn"
        >theme switcher</a
      >
      <p
        v-if="user"
        class="right-align"
        :class="useTheme ? 'white-text' : 'black-text'"
      >
        Welcome {{ user }}
      </p>
      <div>
        <h6 :class="useTheme ? 'white-text' : 'black-text'">
          Uploaded dependencies
        </h6>
      </div>
      <table class="highlight" :class="useTheme ? 'white-text' : 'black-text'">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>1</td>
            <td>Complete</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>100</td>
            <td>Scanning</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>50</td>
            <td>Almost done</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { store } from "../store/store.js";

export default {
  data() {
    return {
      user: store.state.name,
      useTheme: store.state.useTheme,
      //user: null, //will be null att first
    };
  },
  methods: {
    themeSwitcher() {
      //set theme to the opposite to what it is.
      store.state.useTheme = !store.state.useTheme;

      // also need to update this components theme state
      this.useTheme = store.state.useTheme;
    },

    async getP() {
      let res = await fetch("https://swapi.dev/api/planets/2");
      res = await res.json();
      this.planet = res;
    },
  },
};
</script>
<style>
.wrapper {
  height: 100vh;
}
</style>
