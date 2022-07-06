<!-- eslint-disable -->
<template>
  <div class="py-[50px] px-[70px]">
    <div class="flex justify-between items-center">
      <div class="flex space-x-5">
        <button
          class="rounded-full px-4 py-2 text-base font-medium"
          @click="switchTab('rate')"
          :class="
            Tab === 'rate' ? 'bg-[#B659A2] text-white' : ' bg-white text-black'
          "
        >
          RATE
        </button>
        <button
          class="rounded-full px-4 py-2 text-base font-medium"
          @click="switchTab('tarrif')"
          :class="
            Tab === 'tarrif'
              ? 'bg-[#B659A2] text-white'
              : ' bg-white text-black'
          "
        >
          TARIFFS
        </button>
      </div>

      <div
        class="w-[500px] hidden mx-2 bg-[#ECECEC] rounded-md lg:flex ring-1 ring-[#B659A2CC]"
      >
        <input
          type="search"
          v-model.trim="serachQuery"
          name="search"
          placeholder="Keyword : User Email or Description"
          class="bg-transparent w-full border-none outline-none flex-1 p-3"
        />
        <div
          class="icon w-12 max-h-full bg-[#B659A2] rounded-r-md grid place-content-center ml-2"
        >
          <i class="fa-solid fa-search text-white text-xl"></i>
        </div>
      </div>

      <div class="flex items-center space-x-5">
        <div v-if="Tab === 'rate'">
          <h1>Last Update: {{ getRateUpdatedDate }}</h1>
        </div>
        <div v-else>
          <h1>Last Update: {{ getTariffUpdatedDate }}</h1>
        </div>

        <button
          @click="handleUpdateModal"
          class="flex space-x-3 items-center rounded-full px-4 py-2 text-base font-medium bg-green-600 text-white"
        >
          <span>Update</span>
          <i class="fa-solid fa-upload"></i>
        </button>
      </div>
    </div>
    <div class="mt-24 table_rate">
      <Table_Rate v-if="Tab === 'rate'" :rateData="filteredRateData" />
      <Table_Tariff v-if="Tab === 'tarrif'" :tariffData="filteredTariffData" />
    </div>
    <Update
      v-if="updateModal"
      :handleUpdateModal="handleUpdateModal"
      :currentTab="Tab"
    />
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "@/Utils/axios.config.js";
import Table_Rate from "../../components/Table_Rate.vue";
import Table_Tariff from "../../components/Table_Tariff.vue";
import Update from "../../components/Update.vue";
export default {
  name: "rate",
  components: { Table_Rate, Table_Tariff, Update },

  data() {
    return {
      tableData: null,
      isLoading: false,
      Tab: "rate",
      updateModal: false,
      isLoading: false,
      tariffData: null,
      rateData: null,
      serachQuery: "",
    };
  },

  computed: {
    getRateUpdatedDate() {
      if (this.rateData !== null) {
        return new Date(
          this.rateData.results[0].date_uploaded
        ).toLocaleDateString("en-GB");
      }
      return "Loading...";
    },
    getTariffUpdatedDate() {
      if (this.tariffData !== null) {
        return new Date(
          this.tariffData.results[0].date_uploaded
        ).toLocaleDateString("en-GB");
      }
      return "Loading...";
    },
    filteredRateData() {
      if (this.rateData !== null) {
        return this.rateData.results.filter(
          (item) =>
            item.currency_name
              .toLowerCase()
              .includes(this.serachQuery.toLowerCase()) ||
            item.currency_code
              .toLowerCase()
              .includes(this.serachQuery.toLowerCase()) 
        );
      }
    },
    filteredTariffData() {
      if (this.tariffData !== null) {
        return this.tariffData.results.filter(
          (item) =>
            item.hs_description
              .toLowerCase()
              .includes(this.serachQuery.toLowerCase()) ||
            item.hscode
              .toLowerCase()
              .includes(this.serachQuery.toLowerCase()) ||
            item.su.toLowerCase().includes(this.serachQuery.toLowerCase())
        );
      }
    },
  },
  created() {
    this.rate();
  },

  methods: {
    async rate() {
      this.$store.dispatch("setLoading", true);
      this.isLoading = true;

      try {
        const [response1, response2, response3] = await Promise.all([
          axios.get("/api/v1/tariff/"),
          axios.get("/api/v1/rate/"),
          axios.get("/api/v1/data/"),
        ]);
        this.tariffData = response1.data;
        this.rateData = response2.data;

        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        this.$store.dispatch("fetchCalculationData", response3.data);
        this.$store.dispatch("rateList", response2.data);
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
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.table_rate {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
</style>
