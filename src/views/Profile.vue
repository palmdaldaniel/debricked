<template>
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

      <h6>Your repos:</h6>

    <table class="table table-striped table-light">
      <thead>
        <tr>
          <th>Repo</th>
          <th>ID</th>
        </tr>
      </thead>
      <tbody v-for="item in repos" key="item.id">
        <tr>
          <td>{{ item.name }}</td>
          <td>{{ item.id }}</td>
        </tr>
      </tbody>
    </table>
  </div>

  
</template>

<script>
import { urlWhoAmI, urlUsersRepos, token } from "../assets/utils.js";
import { store } from "../store/store.js";

export default {
  data() {
    return {
      user: null,
      useTheme: store.state.useTheme,
      repos: null,
    };
  },
  methods: {
    themeSwitcher() {
      //set theme to the opposite to what it is.
      store.state.useTheme = !store.state.useTheme;

      // also need to update this components theme state
      this.useTheme = store.state.useTheme;
    },
    async whoAmI() {
      try {
        const res = await axios.get(urlWhoAmI, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        this.user = res.data.name;
      } catch (error) {
        console.log("error", error.response);
      }
    },
    async getRepos() {
      try {
        const res = await axios.get(urlUsersRepos, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        console.log(res.data);
        this.repos = res.data;
      } catch (error) {
        console.log("error", error.response);
      }
    },
  },
  mounted() {
    this.whoAmI(), this.getRepos();
  },
};
</script>
<style>
.wrapper {
  height: 100vh;
}
</style>
