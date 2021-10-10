<template lang="">
  <div class="wrapper" :class="useTheme ? 'grey darken-3' : 'grey lighten-5'">
    <div class="container">
      <h3 class="center-align" :class="useTheme ? 'white-text' : 'black-text'">
        Upload your file pls!
      </h3>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload" />
      <button v-on:click="submitFile">Submit</button>
      <button v-on:click="startScanning">Start Progress</button>
      <button v-on:click="getScanningProgres">Get Progress</button>
      <button v-on:click="whoAmI">Who am i ?</button>

      <div class="progress">
        <div :style="{ width: value + '%' }" class="progressBar"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { store } from "../store/store.js";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzM4OTA2NDksImV4cCI6MTYzMzg5NDI0OSwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.Y5JD5a-98H-7Pvbzi_Npviym7ApJC1pKG_EGmdgMuLjyv-JZsCa-pBTqGtu5v68TXd7H_GIctObcMBRhtLoEyR2STilDoRqgVg6ALGc6B8FW3sArEyWPHCy3yQzYDwOfvdETOF1JkegRF8qSWGP-7WIa2CWfiIfHq5xIVn16CgA4n2iYqr1-0ID03OExFiX71qe_GdZO4HOMDfjfVBan--YqAh4b5mH-luzAMl19eBoT2RHxAK3l2G6CDaRMv4wE6yB0-hTKlASqnifvwd4d4Ko9SxRJ1W-HNlTV1gpKEqUuQS0inHO7tCo6hStlS5pYpvXA_om0to9amVlL2aOAyXzNeGtmxwU_WqvX3MGZe7KG-VsOWYUWke4e8qc5jpxMccjhT4RfeA2oM6PtWgC97fXfZvTZkePESk82B0X7HPTetRvhX8dO9mKFqIg9Xqj7hTviqiKPeBZXXC3y1HowouVvM4ihMUcd8JXXZgjx3lM1v5xyUOLvVsp3ygXMHPSuePXMQlMYRXl3f96Ys3p10rthey8By6NyaKcHXewVAmJJC7Pw4DFChIn3JiNhCNxY8DUfWsewUCskYfCUD0gAkiqq-vmQy29KPZ5SmMTzwelAir4gZtwl6tupWZhAPx6GEnRbZrQipIT_sDE104mB7_y1SiOSP02imsQVDb_iOpo";

// submit dependency file // post request
const urlUpload =
  "http://localhost:8081/api/1.0/open/uploads/dependencies/files";

// track scanningprogress // get request
const urlStartScanning =
  "http://localhost:8081/api/1.0/open/finishes/dependencies/files/uploads";

// start the scanning progress // post request
const urlTrackProgress =
  "http://localhost:8081/api/1.0/open/ci/upload/status?ciUploadId=2203480";

const urlWhoAmI = "http://localhost:8081/api/1.0/open/zapier/user";

let interval = 0;

export default {
  data() {
    return {
      id: null,
      file: null,
      useTheme: store.state.useTheme,
      value: 0,
    };
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async submitFile(e) {
      console.log("this.file:>", this.file);

      const formData = new FormData();
      formData.append("repositoryName", "testingiiii");
      formData.append("commitName", "unknown");
      formData.append("fileData", this.file);

      try {
        const res = await axios.post(urlUpload, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
          // prep for upload progressbar
          /*   onUploadProgress: (progressEvent) => {}, */
        });
        console.log("data", res.data);

        this.id = res.data.ciUploadId;
      } catch (error) {
        console.log("error", error);
      }
    },
    async startScanning() {
      console.log("start scanning");
      const formData = new FormData();
      formData.append("ciUploadId", this.id);

      try {
        const res = await axios.post(urlStartScanning, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // if post req returns a 204 fire an interval to get updates about scanning progress every 1.5 sec.
        interval = setInterval(this.getScanningProgres(), 1500);
      } catch (error) {
        console.log("error", error);
      }
    },

    async getScanningProgres() {
      console.log("get scan progress");
      try {
        const res = await axios.get(urlTrackProgress, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        this.value = res.data.progress;
      } catch (error) {
        console.log("error", error);
      }
    },
    async whoAmI() {
      try {
        const res = await axios.get(urlWhoAmI, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        //console.log('id', res.data.ciUploadId);
        console.log(res);
      } catch (error) {
        console.log("error", error);
      }
    },
  },
  watch: {
    // when id is set start the scan progress!
    id: function (val) {
      if (val === this.id) {
        this.startScanning();
      }
    },
    value: function (val) {
      console.log(val);
      clearInterval(interval)
    },
  },
};
</script>
<style scoped>
.wrapper {
  height: 100vh;
}
.progress {
  margin: 2em auto;
}

.progressBar {
  height: 30px;
  background: red;
}
</style>
