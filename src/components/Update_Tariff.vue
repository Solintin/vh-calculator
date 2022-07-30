<!-- eslint-disable -->

<template>
  <div class="layout">
    <div class="update_box py-8 px-4 md:px-8 space-y-8">
      <h1 class="text-xl font-medium text-center mb-3 underline">
        Update Tarrif
      </h1>
      <form @submit="handleUpdateTariff">
        <div class="capitalize text-base md:text-lg font-medium flex-col">
          <div class="flex flex-col">
            <label>HS Description</label>
            <input
              type="text"
              required
              v-model="hs_description"
              class="input_box"
            />
          </div>
          <div class="flex flex-col">
            <label>HSCODE</label>
            <input
              type="number"
              required
              v-model="hscode"
              class="input_box capitalize"
            />
          </div>
          <div class="flex flex-col">
            <label>SU</label>
            <input type="text" required v-model="su" class="input_box" />
          </div>
          <div class="flex flex-col">
            <label>Tarrif ID</label>
            <input
              type="number"
              required
              v-model="id_tariff"
              class="input_box"
            />
          </div>
          <div class="flex flex-col">
            <label>Levy</label>
            <input type="number" required v-model="levy" class="input_box" />
          </div>
          <div class="flex flex-col">
            <label>VAT</label>
            <input
              type="number"
              step="any"
              required
              v-model="vat"
              class="input_box"
            />
          </div>
          <div class="flex flex-col">
            <label>Excercise Duty</label>
            <input type="number" required v-model="e_duty" class="input_box" />
          </div>
        </div>

        <div class="flex item-center space-x-10 justify-center py-2">
          <input
            type="submit"
            :value="`${loading ? 'Updating' : 'Update'} `"
            class="bg-green-600 max-w-max rounded-md px-5 py-2 cursor-pointer text-base font-medium text-white"
          />

          <button
            @click="setUpdateModal"
            class="flex justify-center max-w-max rounded-md px-5 py-2 text-base font-medium bg-red-600 text-white"
          >
            <span>Cancel</span>
          </button>
        </div>
        <h1
          class="text-center"
          :class="error ? 'text-red-500' : 'text-green-500'"
        >
          {{ this.message }}
        </h1>
      </form>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "@/Utils/axios.config.js";
import { digitFormatter } from "@/Utils/helper_function";
import Cookies from "js-cookie";

export default {
  components: {},
  props: {
    setUpdateModal: Function,
    result: Object,
    item: Object,
  },

  data() {
    return {
      hs_description: "",
      hscode: "",
      su: "",
      id_tariff: "",
      levy: "",
      vat: "",
      e_duty: "",
      loading: false,
      error: false,
      message: "",
      axiosConfig: "",
    };
  },

  mounted() {
    this.hs_description = this.item.hs_description;
    this.hscode = this.item.hscode;
    this.su = this.item.su;
    this.vat = this.item.vat;
    this.id_tariff = this.item.id_tariff;
    this.levy = this.item.levy;
    this.e_duty = this.item.e_duty;
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
  methods: {
    handleUpdateTariff(e) {
      e.preventDefault();
      this.loading = true;
      axios
        .put(
          `/api/v1/tariff/${this.item.id}/`,
          {
            id: this.item.id,
            hs_description: this.hs_description,
            hscode: this.hscode,
            su: this.su,
            id_tariff: this.id_tariff,
            levy: this.levy,
            vat: this.vat,
            e_duty: this.e_duty,
          },
          axiosConfig
        )
        .then((response) => {
          this.$toast.success("Update Successful");

          location.reload();
          this.loading = false;
          this.message = "Update Successful";
          // calculationList(response.data);
        })
        .catch((error) => {
          this.$toast.error("An error occured");

          this.loading = false;
          this.error = true;
          this.message = "Update Failed";
        });
    },
    digitFormatter(input) {
      return digitFormatter(input);
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
  max-height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-content: center;
  /* pointer-events: none; */
}
.update_box {
  @apply shadow-lg bg-white rounded-lg min-w-[275] lg:w-[500px] max-h-[600px] overflow-y-auto;
  z-index: 2;
}
.input_box {
  @apply outline-none p-4 ring-2 ring-gray-300 focus:ring-[#B659A2CC] my-2 rounded text-black;
}
</style>
