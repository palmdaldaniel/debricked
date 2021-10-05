<template lang="">
  <div class="wrapper" :class="useTheme ? 'grey darken-3' : 'grey lighten-5'">
    <div class="container">
      <h3 class="center-align" :class="useTheme ? 'white-text' : 'black-text'">
        Upload your file pls!
      </h3>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload" />
      <button v-on:click="submitFile">Submit</button>
    </div>
  </div>
</template>
<script>
import { store } from "../store/store.js";

export default {
  data() {
    return {
      file: null,
      useTheme: store.state.useTheme,
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async submitFile(e) {
      console.log("this.file:>", this.file);

      const res = await axios.get("https://swapi.dev/api/planets/1");

      console.log(res.data);
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
}
</style>
