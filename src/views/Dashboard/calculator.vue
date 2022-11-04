<!-- eslint-disable -->
<template>
  <div class="py-[50px]">
    <Loading v-if="isLoading" />
    <div class="mb-3 border-b border-purple-200 pl-10">
      <div
        class="flex text-base md:text-2xl font-medium space-x-5 container mx-auto"
      >
        <button
          @click="switchTab('help')"
          class="outline-none"
          :class="
            Tab === 'help'
              ? 'border-4 border-gray-300 bg-gray-300 rounded-t px-5 py-2 text-white transform-translate duration-300'
              : 'text-gray-500'
          "
        >
          Help
        </button>
        <button
          @click="switchTab('calculator')"
          class="outline-none"
          :class="
            Tab === 'calculator'
              ? 'border-4 border-gray-300 bg-gray-300 rounded-t px-5 py-2 text-white transform-translate duration-300'
              : 'text-gray-500'
          "
        >
          Calculator
        </button>
      </div>
    </div>

    <Guide v-if="Tab === 'help'" />
    <Calculator v-else :fetchCalculationData="fetchCalculationData" />
  </div>
</template>
<!-- eslint-disable -->

<script>
import Guide from "@/components/Guide.vue";
import Calculator from "@/components/MainCalculator.vue";
import axios from "@/Utils/axios.config.js";
import Cookies from "js-cookie";
import Loading from "../../components/Loading.vue";

export default {
  name: "calculator-app",
  components: { Guide, Calculator, Loading },
  data() {
    return {
      Tab: "help",
      axiosConfig: "",
      fetchCalculationData: null,
      isLoading: false,
    };
  },

  mounted() {
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    this.getCalculationData();
  },
  methods: {
    switchTab(currentTab) {
      this.Tab = currentTab;
    },

    async getCalculationData() {
      this.isLoading = true;
      try {
        axios.get("/api/v1/data/", this.axiosConfig).then((res) => {
          this.$store.dispatch("fetchCalculationData", res.data);
          this.fetchCalculationData = res.data;
          this.isLoading = false;
        });
      } catch (err) {
        this.isLoading = false;

        console.log(err);
      }
    },
  },
};
</script>
<!-- eslint-disable -->

<style>
.table_calculator {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
</style>
