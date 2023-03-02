<!-- eslint-disable -->
<template>
  <div class="pb-[50px] pt-5">
    <Loading v-if="isLoading"/>
    <p class="text-lg font-medium my-5 pl-5 whitespace-nowrap truncate">
      Welcome back {{ $store.state.currentUser.user.email }}!
    </p>
    <div
      class="mb-3 border-b border-purple-200 pl-10 pr-5 flex justify-between"
    >
      <div class="flex text-base md:text-xl space-x-5 container mx-auto">
        <button
          @click="switchTab('help')"
          class="outline-none"
          :class="
            Tab === 'help'
              ? 'border-2 border-[#DB44C9] bg-[#DB44C9] rounded-t-lg px-3 text-white transform-translate duration-300'
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
              ? 'border-2 border-[#DB44C9] bg-[#DB44C9] rounded-t-lg px-3 text-white transform-translate duration-300'
              : 'text-gray-500'
          "
        >
          Calculator
        </button>
      </div>
      <button @click="logout" class="block text-base md:text-xl">Logout</button>
    </div>

    <Guide v-if="Tab === 'help'" />
    <Calculator v-else />
  </div>
</template>
<!-- eslint-disable -->

<script>
import Guide from "@/components/Guide.vue";
import Calculator from "@/components/MainCalculator.vue";
import axios from "@/Utils/axios.config.js";
import Cookies from "js-cookie";
import Loading from '../components/Loading.vue';

const token = Cookies.get("token");
const axiosConfig = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
export default {
  name: "calculator-app",
  components: { Guide, Calculator, Loading },
  data() {
    return {
      Tab: "help",
      isLoading: true,
    };
  },

  mounted() {
    this.getCalculationData();
  },

  methods: {
    async getCalculationData() {
      let token = Cookies.get("token");
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      this.$store.dispatch("setLoading", true);

      try {
        const [response1, response2] = await Promise.all([
          axios.get("/api/v1/tariff/", axiosConfig),
          axios.get("/api/v1/data/", axiosConfig),
        ]);
        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        this.$store.dispatch("fetchCalculationData", response2.data);
        this.$store.dispatch("tariffList", response1.data);
      } catch (err) {
        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        console.log(err);
      }
    },

    switchTab(currentTab) {
      this.Tab = currentTab;
    },

    handleUpdateModal() {
      this.updateModal = !this.updateModal;
    },

    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
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
