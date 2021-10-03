<template lang="">
  <div class="wrapper" :class="useTheme ? 'grey darken-3' : 'grey lighten-5'">
    <div class="container">
      <h3 class="center-align" :class="useTheme ? 'white-text' : 'black-text'">
        Upload your file pls!
      </h3>
      <input type="file" />
    </div>
  </div>
</template>
<script>
  import { store } from "../store/store.js";
export default {


  data() {
    return {
      useTheme: store.state.useTheme,
    };
  },

};
</script>
<style scoped>
.wrapper {
    height: 100vh;
}

</style>
