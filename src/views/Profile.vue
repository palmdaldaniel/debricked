<template>
<div v-if='user' class="wrapper"  :class="useTheme ? 'dark' : 'light'">
  <div class="container">
    <button
      type="button"
      v-on:click="themeSwitcher"
      class="btn"
      :class="useTheme ? 'btn-light' : 'btn-dark'"
    >
      Theme Switcher
    </button>
    <div v-if="user" :class="useTheme ? 'text-white' : 'text-black'">
      <p class="py-3"><span>Welcome:</span> {{ user }}</p>
      <div v-if="repos">
        <p><span>Your repos:</span></p>

        <table
          class="table table-striped"
          :class="useTheme ? 'table-dark' : 'table-light'"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in repos" key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.id }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-if="errorMsg" class="alert alert-warning" role="alert">
      {{ this.errorMsg }}
    </div>
  </div>
  </div>
  <div v-else class="text-center py-3">
    <h3>You need to be logged in first</h3>
    <a href="https://debricked.com/" target="_blank">Go to home</a>
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
      errorMsg: null,
    };
  },
  methods: {
    themeSwitcher() {
      this.useTheme = !this.useTheme
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
        if (error.response) {
          this.errorMsg = `${error.response.data.message} - ${error.response.data.code}`;
        }
      }
    },
    async getRepos() {
      try {
        const res = await axios.get(urlUsersRepos, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        this.repos = res.data;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          this.errorMsg = `${error.response.status} - ${error.response.statusText}`;
        }
      }
    },
  },
  watch: {
    useTheme: function(val) {
      localStorage.setItem('theme', val)
      store.updateTheme(val)
    }

  },
  mounted() {
    this.whoAmI(), this.getRepos();

    // retrive value from local storage
    const jsonValue = localStorage.getItem("theme");
    const theme = JSON.parse(jsonValue);

    this.useTheme = theme 
  },
 
 
};
</script>
<style scoped>


.wrapper {
  height: 100vh;
}

.container {
  position: relative;
}

button {
  position: absolute;
  top: 20px;
  left: 87%;
}

span {
  font-weight: bolder;
}


.dark {
  background: black;
}

.light {
  background: white;
}
</style>
