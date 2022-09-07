<!-- eslint-disable -->
<template>
  <div class="py-[50px] px-[70px]">
    <div class="flex justify-between items-center">
      <div class="flex space-x-5">
        <router-link
          to="/admin/rate"
          class="bg-[#B659A2] text-white rounded-full px-4 py-2 text-base font-medium"
        >
          
          RATE
        </router-link>
        <router-link
          to="/admin/tariff"
          class="bg-white text-black rounded-full px-4 py-2 text-base font-medium"
        >
        TARIFFS
        </router-link>
      </div>

      <div
        class="w-[500px] hidden mx-2 bg-[#ECECEC] rounded-md lg:flex ring-1 ring-[#B659A2CC]"
      >
        <input
          type="search"
          v-model.trim="searchQuery"
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
        <div>
          <h1>Last Update: {{ getRateUpdatedDate }}</h1>
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
      <Table_Rate
        :rateData="filteredRateData"
        :next="nextRate"
        :prev="prevRate"
        :nextHandler="nextHandler"
        :prevHandler="prevHandler"
        :prevPageNumber="prevPageNumber"
        :nextPageNumber="nextPageNumber"
      />
    </div>
    <Update
      v-if="updateModal"
      :handleUpdateModal="handleUpdateModal"
      :currentTab="'rate'"
    />
  </div>
</template>
<!-- eslint-disable -->

<script>
  import { mapState } from "vuex";
import axios from "@/Utils/axios.config.js";
import Table_Rate from "../../components/Table_Rate.vue";
import Update from "../../components/Update.vue";
import Cookies from "js-cookie";

export default {
  name: "rate",
  components: { Table_Rate, Update },

  data() {
    return {
      tableData: null,
      isLoading: false,

      updateModal: false,
      isLoading: false,
      rateData: null,
      searchQuery: "",
      prevRate: "",
      nextRate: "",
      urlRate: "/api/v1/rate/",
      axiosConfig: "",
      PageNumber: null,
      
    };
  },

  computed: {
    ...mapState(["calculationData", "ratesList"]),
    getRateUpdatedDate() {
      if (this.rateData !== null) {
        return new Date(
          this.rateData.results[0].date_uploaded
        ).toLocaleDateString("en-GB");
      }
      return "Loading...";
    },

    filteredRateData() {
      if (this.rateData !== null) {
        return this.calculationData.rate.filter(
          (item) =>
            item.currency_name
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            item.currency_code
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      }
    },
    prevPageNumber() {
      const param = new URLSearchParams(this.nextRate);
      const PageNumber = param.get("offset");
      //PageNumber is gotten as a string that y (+) is to convert to interger
      return (+PageNumber - 20) / 20 + 1;
    },
    nextPageNumber() {
      const param = new URLSearchParams(this.nextRate);
      const PageNumber = param.get("offset");
      //PageNumber is gotten as a string that y (+) is to convert to interger

      return +PageNumber / 20 + 1;
    },
  },
  mounted() {
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    this.fetchRate(this.urlRate);
    this.getCalculationData();

  },

  methods: {
    async getCalculationData() {
      this.$store.dispatch("setLoading", true);
      //tariffdata is Fetched due to the rate change date on the invoice to be printed
      try {
        const [response1, response2, response3]  = await Promise.all([
          axios.get("/api/v1/tariff/", this.axiosConfig),
          axios.get("/api/v1/data/", this.axiosConfig),
          axios.get("/api/v1/rate/", this.axiosConfig),
        ]);
        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        this.$store.dispatch("fetchCalculationData", response2.data);
      } catch (err) {
        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        console.log(err);
      }
    },
    async fetchRate(urlRate) {
      this.$store.dispatch("setLoading", true);
      this.isLoading = true;

      try {
        const [response1] = await Promise.all([
          axios.get(urlRate, this.axiosConfig),
        ]);
        this.rateData = response1.data;

        this.prevRate = response1.data.previous;
        this.nextRate = response1.data.next;
        console.log(this.prevRate);
        console.log(this.nextRate);
        
        console.log("Prev page:", this.prevPageNumber);
        console.log("Next page:", this.nextPageNumber);

        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        this.$store.dispatch("rateList", response1.data);
      } catch (err) {
        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        console.log(err);
      }
    },

    handleUpdateModal() {
      this.updateModal = !this.updateModal;
    },
    nextHandler() {
      //Get next string api

      const getNextRateApi = this.nextRate.replace(
        "https://valuehandler.herokuapp.com",
        ""
      );
      this.urlRate = getNextRateApi;
      this.fetchRate(this.urlRate);
    },
    prevHandler() {
      //Get Prev string api

      const getPrevRateApi = this.prevRate.replace(
        "https://valuehandler.herokuapp.com",
        ""
      );
      this.urlRate = getPrevRateApi;
      this.fetchRate(this.urlRate);
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
