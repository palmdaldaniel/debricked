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
    <div :style="{ width: value + '%' }" class="progressBar">
    </div>
  </div>

    </div>
  </div>
</template>
<script>
import { store } from "../store/store.js";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzM4NzI0MTksImV4cCI6MTYzMzg3NjAxOSwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.BftQuYhy9s1fzHxLP0qQrrznbvPPSrfF-Ej7xiAqxn9CWLXI1a-pXV7YIgMdGTpPhU0RJcGwUcbyC1IW--PTSc9E8A20Fw6bRrPWFLGu1UaAqwBG5rpk_JXWL27nZ9rwx9lJ28FhrBTHFNbrV00EyrtuETLdU_KmahxW-QzVXBdkfnwfV0CsRon8Exf8o9X9OyjODdoroD0rVu-drC6sF_bnQ4qx8onOJS__yGjm8kHV-Z7eY-9-wm_IOxIaIVyzU6TFVAP8L3EJ1B8qgxt-N2T8C6OcsE4FKLkDqHxlmytZVnMcwSfOHUQglkB4BX4uDEjYkgpGAYGZIRpqtPWJ8EDlz2z51tPTZZ_S4qnpy0LNGNRv3HVFnHAGnKykEiH7G1URgBhn14zg6HXeQkvNwfCzYeIkRgxfh26RHrJyGasQWJw_Y-6R3nIDGNSgQ5p9Wp9THSAGQBfZrllVvWrUoGs5LF7x9lhcslEJbWxVMfBDNtqzi6SX01hWJouZO0inVDIo-gvIc_lkgsWwfigcAkIOIYCk9TnXs2Jxe58NziioQU7X6hy2CKQJl4YWuIvl40DaUEupyw3NC5BK_B27mkr5_AVs1t_eVzfZe0q0EO-wr2stfbxr1qq_hblIPI1tsaw-IhYuhoWT3utzGfdxngeIBRGXtW4X4AbK1Vo6Juo";

// submit dependency file // post request
const urlUpload =
  "http://localhost:8081/api/1.0/open/uploads/dependencies/files";

// track scanningprogress // get request
const urlStartScanning =
  "http://localhost:8081/api/1.0/open/finishes/dependencies/files/uploads";

// start the scanning progress // post request
const urlTrackProgress =
  "http://localhost:8081/api/1.0/open/ci/upload/status?ciUploadId=2203480";

const urlWhoAmI = "http://localhost:8081/api/1.0/open/zapier/user"

export default {
  data() {
    return {
      id: 2186456,
      file: null,
      useTheme: store.state.useTheme,
      value: 0
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
      } catch (error) {
        console.log("error", error);
      }
    },
    async startScanning() { 
      console.log('start scanning');
        const formData = new FormData();
        formData.append('ciUploadId', "2203480")

      try {
        const res = await axios.post(urlStartScanning, formData,
         {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("data", res);
      } catch (error) {
        console.log("error", error);
      }
    },
    interval() {
      let inter = setInterval(this.getScanningProgres, 3000);
    },
    async getScanningProgres() {

      console.log('get scan progress');
      try {
        const res = await axios.get(urlTrackProgress, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        //console.log('id', res.data.ciUploadId);
       
        console.log("progress:>", res);
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


    }
  },
};
</script>
<style scoped > 
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
