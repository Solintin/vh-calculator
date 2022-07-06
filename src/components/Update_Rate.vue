<!-- eslint-disable -->

<template>
  <div class="layout">
    <div class="update_box py-8 px-4 md:px-8 space-y-8">
      <h1 class="text-xl font-medium text-center mb-3 underline">
        Update Rate
      </h1>
      <form @submit="handleUpdateRate">
        <div class="capitalize text-base md:text-lg font-medium flex-col">
          <div class="flex flex-col">
            <label>Current Name</label>
            <input
              type="text"
              required
              v-model="currency_name"
              class="input_box"
            />
          </div>
          <div class="flex flex-col">
            <label>Current Code</label>
            <input
              type="text"
              required
              v-model="currency_code"
              class="input_box capitalize"
              @keyup="currency_code = currency_code.toUpperCase()"
            />
          </div>
          <div class="flex flex-col">
            <label>Exchange Rate</label>
            <input
              type="number"
              step="any"
              required
              v-model="exchange_rate"
              class="input_box"
            />
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

export default {
  components: {},
  props: {
    setUpdateModal: Function,
    result: Object,
    item: Object,
  },

  data() {
    return {
      currency_code: "",
      currency_name: "",
      exchange_rate: "",
      loading: false,
      error: false,
      message: "",
    };
  },

  mounted() {
    this.currency_code = this.item.currency_code;
    this.currency_name = this.item.currency_name;
    this.exchange_rate = this.item.exchange_rate;
  },
  methods: {
    handleUpdateRate(e) {
      e.preventDefault();
      this.loading = true;
      axios
        .put(`/api/v1/rate/${this.item.id}/`, {
          id: this.item.id,
          currency_name: this.currency_name,
          currency_code: this.currency_code,
          exchange_rate: this.exchange_rate,
        })
        .then((response) => {
          location.reload();
          this.loading = false;
          this.message = "Update Successful";
          // calculationList(response.data);
        })
        .catch((error) => {
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
  @apply shadow-lg bg-white rounded-lg min-w-[275] lg:w-[500px];
  z-index: 2;
}
.input_box {
  @apply outline-none p-4 ring-2 ring-gray-300 focus:ring-[#B659A2CC] my-2 rounded text-black;
}
</style>
