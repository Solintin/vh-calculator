<!-- eslint-disable -->

<template>
  <div class="layout">
    <div class="update_box space-y-8">
      <h1 class="text-xl font-medium text-center">
        {{ currentTab.toUpperCase() }}
      </h1>
      <h1 class="text-xl font-medium">
        Select The File To Be Uploaded From Your Computer
      </h1>
      <input
        @change="handleImageUpload($event)"
        type="file"
        name=""
        accept=".csv, .xls, .xlsx"
        id="fileUpload"
        hidden
      />

      <div
        class="w-[4/12] bg-[#ECECEC] rounded-md flex ring-1 ring-[#B659A2CC]"
      >
        <div
          class="bg-transparent w-full border-none outline-none flex-1 p-3 truncate"
        >
          {{ fileName }}
        </div>
        <label
          for="fileUpload"
          class="cursor-pointer icon w-12 max-h-full bg-[#B659A2] rounded-r-md grid place-content-center ml-2"
        >
          <i class="fa-solid fa-upload text-white text-xl"></i>
        </label>
      </div>

      <div style="width: 100%" v-if="uploading">
        <LvProgressBar :value="uploadProgressPercent" color="#38b2ac" />
      </div>
      <div class="text-center text-green-800">{{ success_message }}</div>

      <div class="flex item-center space-x-5 justify-center py-2">
        <button
          @click="upload"
          :disabled="fileUpdate == null"
          :class="
            fileUpdate == null
              ? 'cursor-not-allowed bg-green-300'
              : 'bg-green-600'
          "
          class="flex justify-center max-w-max rounded-md px-5 py-2 text-base font-medium text-white"
        >
          <span>Upload Now</span>
        </button>
        <button
          @click="handleUpdateModal"
          class="flex justify-center max-w-max rounded-md px-5 py-2 text-base font-medium bg-red-600 text-white"
        >
          <span>Cancel</span>
        </button>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import LvProgressBar from "lightvue/progress-bar";
import axios from "@/Utils/axios.config.js";
import Cookies from "js-cookie";

export default {
  props: ["handleUpdateModal", "currentTab", "opacity-100"],

  components: {
    LvProgressBar,
  },

  data() {
    return {
      success_message: "",
      fileName: "Choose a file to upload....",
      fileUpdate: null,
      uploadProgressPercent: 0,
      uploading: false,
    };
  },

  methods: {
    handleImageUpload(event) {
      this.fileName = event.target.files[0].name;
      this.fileUpdate = event.target.files[0];
    },
    async upload() {
      let token = Cookies.get("token");

      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          this.uploadProgressPercent = Math.floor((loaded * 100) / total);
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      let formData = new FormData();
      formData.append("file_upload", this.fileUpdate);
      if (this.currentTab == "rate") {
        this.uploading = true;
        try {
          await axios.post("/api/v1/rate/", formData, options).then((res) => {
            this.$toast.success("Update Successful");

            this.success_message = res.data.detail;
          });
        } catch (error) {
          this.$toast.error(JSON.stringify(error.response.data));

          console.log(error);
        }
      } else {
        this.uploading = true;

        try {
          await axios.post("/api/v1/tariff/", formData, options).then((res) => {
            this.$toast.success("Update Successful");

            this.success_message = res.data.detail;
          });
        } catch (error) {
          this.$toast.error(JSON.stringify(error.response.data));

          console.log(error);
        }
      }
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-content: center;
  /* pointer-events: none; */
}
.update_box {
  @apply shadow-lg bg-white rounded-lg;
  z-index: 2;
  padding: 2rem;
  width: max-content;
  display: grid;
  place-content: center;
}
</style>
