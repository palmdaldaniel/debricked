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
.wrapper {
    height: 100vh;
}

</style>
