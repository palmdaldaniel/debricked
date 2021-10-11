<template lang="">
  <div
    class="container p-4"
    :class="useTheme ? 'dark text-white' : 'light text-dark'"
  >
    <h3>Debricked Dependency Scanner</h3>
    <form>
      <div class="form-group my-4">
        <input
          type="file"
          id="file"
          ref="file"
          class="form-control-file"
          v-on:change="handleFileUpload"
        />
      </div>
      <button
        v-if="!isScanning"
        type="button"
        class="btn my-4"
        :class="useTheme ? 'btn-light' : 'btn-dark'"
        v-on:click="submitFile"
        :disabled="file === null"
      >
        Submit
      </button>
      <div v-else="isScanning" class="spinner-border" role="status"></div>
    </form>

    <div class="progress">
      <div
        :style="{ width: value + '%' }"
        class="progress-bar progress-bar-striped"
        :class="useTheme ? 'bg-warning' : 'bg-dark'"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        ƒ
      >
        {{ value + "%" }}
      </div>
    </div>
    <div v-if="errorMsg" class="alert alert-warning" role="alert">
      {{ this.errorMsg }}
    </div>

    <Results v-if="dependencies" v-bind:items="dependencies" />
  </div>
</template>
<script>
import {
  token,
  urlUpload,
  urlStartScanning,
  urlTrackProgress,
} from "../assets/utils";
import Results from "../components/Results.vue";
import { store } from "../store/store";

let intervalId;

export default {
  components: {
    Results,
  },
  data() {
    return {
      id: null,
      file: null,
      value: 0,
      vulnerabilities: null,
      dependencies: null,
      isScanning: false,
      errorMsg: null,
      useTheme: store.state.useTheme,
    };
  },
  watch: {
    // when id is set, start the scan progress!
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
        if (res.status === 200) {
          this.id = res.data.ciUploadId;
        }
      } catch (error) {
        if (error.response) {
          this.errorMsg = `${error.response.statusText} - ${error.response.status}`;
        }
      }
    },
    async startScanning() {
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
          this.isScanning = true;
        }
      } catch (error) {
        if (error.response) {
          this.errorMsg = `${error.response.statusText} - ${error.response.status} `;
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
          // when scan is complete clear the the interval and set the progress value to it's final value.
          clearInterval(intervalId);
          this.value = res.data.progress;

          // hide loading indicator when scanning is complete, and clear this.file so user does not accidently try to scan again
          this.isScanning = false;
          this.file = null;

          // from results - the 5th object always seems to have cves so in order to display some result on the page I choose this one.
          if (res.data.automationRules[5].hasCves) {
            this.dependencies = res.data.automationRules[5].triggerEvents.slice(
              0,
              5
            );
          }
        }
      } catch (error) {
        if (error.response) {
          this.errorMsg = `${error.response.statusText} - ${error.response.status} `;
          clearInterval(intervalId);
          this.isScanning = false;
          this.file = null;
        }
      }
    },
  },
  mounted() {
    // retrive value from local storage
    const jsonValue = localStorage.getItem("theme");
    const theme = JSON.parse(jsonValue);

    this.useTheme = theme;
  },
};
</script>
<style scoped>
.container {
  margin: 0 auto;
}
.progress {
  border-radius: 20px;
  height: 30px;
  margin: 2em auto;
  font-size: 18px;
}

.dark {
  background: black;
}

.light {
  background: white;
}
</style>
