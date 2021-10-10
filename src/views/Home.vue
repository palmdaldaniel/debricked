<template lang="">
  <div class="wrapper" :class="useTheme ? 'grey darken-3' : 'grey lighten-5'">
    <div class="container">
      <h3 class="center-align" :class="useTheme ? 'white-text' : 'black-text'">
        Upload your file pls!
      </h3>
      <input type="file" id="file" ref="file" v-on:change="handleFileUpload" />
      <button v-on:click="submitFile" :disabled="file === null">Submit</button>
      <button v-on:click="startScanning">Start Progress</button>
      <button v-on:click="getScanningProgress">Get Progress</button>
      <button v-on:click="whoAmI">Who am i ?</button>

      <div class="progress">
        <div :style="{ width: value + '%' }" class="progressBar"></div>
      </div>
    </div>
    <table  v-if="dependencies">
      <tr>
        <th>CVE</th>
        <th>Dependency</th>
        <th>CVSS2</th>
        <th>CVSS3</th>
      </tr>
      <tr v-for="item in dependencies" :key="item.dependency">
        <td>{{ item.cve }}</td>
        <td>{{ item.dependency }}</td>
        <td>{{ item.cvss2 }}</td>
        <td>{{ item.cvss3 }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
import { store } from "../store/store.js";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzUxMiJ9.eyJpYXQiOjE2MzM4OTQ2NTEsImV4cCI6MTYzMzg5ODI1MSwicm9sZXMiOlsiUk9MRV9PUEVOX0FQSSIsIlJPTEVfVVNFUiIsIlJPTEVfQ09NUEFOWV9BRE1JTiJdLCJ1c2VybmFtZSI6IjdmYTZkODBmZjVkMmYyM2EzZjY0Mjk5YTU2N2EzOWUwYTRmZDE2ZjYifQ.taPVFNsZHtbL5gZlr33kMzpp6mLEQQwJ7MYFU2AtZzgzIvMGidWrdkgzAv4qMntRq6gYG8ggyIJ4VCE_ntYfOPUTeKASDPJm5IX09XKs0GolqPmZvYqvBSe0fRbqjEsel2hz6nc1CIrdxaHxQBcgXfAradBNS87R18iW0Tt3K0Zw_-UvMfu8CyfNTHqXQ3OQrtlLZ1elKGQuvahas5nqbmyPQ6_yP74WVRF2-0k0U5dd4wmqX9GflcoI0lDCg2vuEDtvE1qT-1gZmB0rvxk4K4ltOyDTLzDpAFk0gEHvE9_-3ZwVisZ_8nZYZXVpy6nyAczcTIF09SAfPeBO3dMEVrYg6T2bbNwEjRQEeLufUfhQmor3IoakrusoJs8nSe-9pOwhJNS7ZRfoK7ynQ8pzsYEAQRTnLz0uWDaqD1_rgX18saoaaPHv_HdgQA5uB4VHJuYO33dGPwtJxVjt9qU4CiW1wU1Go-yym2PGphL1T6ynXekVGrcXln2bsoWTGlGT8K6YIliTz5ZKtLbgw3t13R9ZK-zE7A7RlkEC2Z2WnzUIMp_mZaTIPfCuNChIzRBPJ31oVo4-V8UDSxZ-h0g6y72qeUBE7A1sPUJU-1ibd4EGaP0pArvhU_p4CcW1buPl_NTnm3jtnJPWqE2dLZA2VHy0fV89Qjidh26lFwxhtAo";

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
      dependencies: null
    };
  },
  watch: {
    // when id is set start the scan progress!
    id: function (val) {
      if (val === this.id) {
        this.startScanning();
      }
    },
    dependencies: function (val) {
      console.log("val that is ready to be used:>", this.dependencies);
    },
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
        console.log("error", error);
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
        console.log("res.data:>", res.data);

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
    async getResults() {
      console.log("hello getting results");
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
