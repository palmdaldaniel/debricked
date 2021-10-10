<template lang="">
  <div class="wrapper" :class="useTheme ? 'grey darken-3' : 'grey lighten-5'">
    <div class="container">
      <h3 class="center-align" :class="useTheme ? 'white-text' : 'black-text'">
        Upload your file pls!
      </h3>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload" />
      <button v-on:click="submitFile" :disabled="file === null">Submit</button>
      <div class="progress">
        <div :style="{ width: value + '%' }" class="progressBar"></div>
      </div>
    </div>

    <table class="table table-dark" v-if="dependencies">
      <thead>
        <tr>
          <th>CVE</th>
          <th>Dependency</th>
          <th>CVSS2</th>
          <th>CVSS3</th>
        </tr>
      </thead>
      <tbody v-for="item in dependencies" :key="item.dependency">
        <tr>
          <td>{{ item.cve }}</td>
          <td>{{ item.dependency }}</td>
          <td>{{ item.cvss2 }}</td>
          <td>{{ item.cvss3 }}</td>
        </tr>
      </tbody>
    </table>
    <div v-if="errorMsg" class="alert alert-warning" role="alert">
      {{ this.errorMsg }}
    </div>
    <button v-on:click="whoAmI">Who am i ?</button>
  </div>
</template>
<script>
import { store } from "../store/store.js";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzM4OTk4MTksImV4cCI6MTYzMzkwMzQxOSwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.cpGvFTZeyA677tXQjtJJO72JRRVrMfuBYpg-jwlU3AjbgaFEM4r2X2I8iPLhkwi0IkSQS8MECEr2X-igTwSrsnkeWdjVBAfg5NOu2f_cOC8Zhvtrkgzium0ViUv8cfeLDVd2t_MqOJRCnzdZvxgwGAZMWnNsMFv9ovNsTcLyIYOhVC9RuujfT-aMM3EGrJ0CFAXMm8O5ZP3mQHU_pZbCbZOpZVCjRpe0flu758XovcdrxNg8ksEWtxHSoNszJa1r4jsZmfdfOQX_EsPKLLyJ3HIJx2CJg_dPmHYUuVsZy-LBX5td6VBIC72ltOW_XJ-tn1BezqrC1O-X4hHukNzPIzHKZ725U070gHT2HKq1pl7zMd9UdcJmGQOmxVsmYbG8ngrg3qf2g2Bd_Qcjnb5Iq45x09FKLVpO_tZuCEBzlu72UVaQ9oJL_87gDyxHvY1gS8eDrb58K6vgVug7rFyKEwaBtRGKJWx2U7PItPIecChMR15XAA2In8Tyv82vuFA-6vJR8x1jvAt_DN0X5aZOa8B3GN-CyINVW7P8wF6kAzD6Q4RWdguS7SL1v8llMjQ8AxFiD8MF5Bi_37re2MflFXsIZclRk3AFSm7SRT_Zy4kfZtbPDife8owkKBwcHseJ__YndlBiUGg-X49W0puH8C09qFuQuGBxbVZne7EvhsE";

// submit dependency file // post request
const urlUpload =
  "http://localhost:8081/api/1.0/open/uploads/dependencies/files";

// track scanningprogress // get request
const urlStartScanning =
  "http://localhost:8081/api/1.0/open/finishes/dependencies/files/uploads";

// start the scanning progress // post request
const urlTrackProgress = "http://localhost:8081/api/1.0/open/ci/upload/status";

const urlWhoAmI = "http://localhost:8081/api/1.0/open/zapier/user";

let intervalId;
export default {
  data() {
    return {
      id: null,
      file: null,
      useTheme: store.state.useTheme,
      value: 0,
      vulnerabilities: null,
      dependencies: null,
      isScanning: false,
      errorMsg: null,
    };
  },
  watch: {
    // when id is set start the scan progress!
    id: function (val) {
      if (val === this.id) {
        this.startScanning();
      }
    },
    errorMsg: function (val) {
      setTimeout(() => {
        this.errorMsg = null;
      }, 3000);
    },
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async submitFile(e) {
      const formData = new FormData();
      formData.append("repositoryName", "testingiiii");
      formData.append("commitName", "unknown");
      formData.append("fileData", this.file);

      try {
        const res = await axios.post(urlUpload, formData, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("data", res);
        if (res.status === 200) {
          this.id = res.data.ciUploadId;
        }
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
        if (res.status === 204) {
          intervalId = setInterval(this.getScanningProgress, 1500);
        }
      } catch (error) {
        if (error.response) {
          this.errorMsg = error.response.statusText;
        }
      }
    },

    async getScanningProgress() {
      try {
        const res = await axios.get(
          `http://localhost:8081/api/1.0/open/ci/upload/status`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
            params: {
              ciUploadId: this.id,
            },
          }
        );
        if (res.status === 202) {
          this.value = res.data.progress;
        } else if (res.status === 200) {
          console.log("scan is complete", res.data);
          // when scan is complete clear the the interval and set the progress value to it's final value.
          clearInterval(intervalId);
          this.value = res.data.progress;

          // from results - the 5th object always seems to have cves so in order to display some result on the page I choose this one.
          if (res.data.automationRules[5].hasCves) {
            console.log(
              "data to loop",
              res.data.automationRules[5].triggerEvents
            );
            this.dependencies = res.data.automationRules[5].triggerEvents;
          }
        }
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

.table {
  margin: 0 auto;
  width: 60%;
}
</style>
