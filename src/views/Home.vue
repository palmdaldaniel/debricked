<template lang="">
  <div class="wrapper" :class="useTheme ? 'grey darken-3' : 'grey lighten-5'">
    <div class="container">
      <h3 :class="useTheme ? 'white-text' : 'black-text'">
        Debricked Dependency Scanner
      </h3>
      <form>
        <div class="form-group">
          <label class="m-4" for="file">Choose file</label>
          <input
            type="file"
            id="file"
            ref="file"
            class="form-control-file"
            v-on:change="handleFileUpload"
          />
        </div>
        <button
          type="button"
          class="btn btn-dark m-4"
          v-on:click="submitFile"
          :disabled="file === null"
        >
          Submit
        </button>
      </form>

      <div class="progress">
        <div
          :style="{ width: value + '%' }"
          class="progress-bar progress-bar-striped bg-dark"
          role="progressbar"
          aria-valuemin="0"
          aria-valuemax="100"
          ƒ
        > {{value + '%'}}</div>
      </div>
    </div>
    <div v-if="errorMsg" class="alert alert-warning" role="alert">
      {{ this.errorMsg }}
    </div>

    <Results v-if="dependencies" v-bind:items="dependencies" />
  </div>
</template>
<script>
import { store } from "../store/store.js";
import {
  token,
  urlUpload,
  urlStartScanning,
  urlTrackProgress,
  urlWhoAmI,
} from "../assets/utils";
import Results from "../components/Results.vue";

let intervalId;

export default {
  components: {
    Results,
  },
  data() {
    return {
      id: null,
      file: null,
      useTheme: store.state.useTheme,
      value: 100,
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
      e.preventDefault();

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
          intervalId = setInterval(this.getScanningProgress, 1000);
        }
      } catch (error) {
        if (error.response) {
          this.errorMsg = error.response.statusText;
        }
      }
    },

    async getScanningProgress() {
      try {
        const res = await axios.get(urlTrackProgress, {
          headers: {
            Authorization: "Bearer " + token,
          },
          params: {
            ciUploadId: this.id,
          },
        });
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
  border-radius: 20px;
  height: 30px;
  margin: 2em auto;
  font-size: 18px;
}


</style>
