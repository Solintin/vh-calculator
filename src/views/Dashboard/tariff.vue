<!-- eslint-disable -->
<template>
  <div class="py-[50px] px-[70px]">
    <div class="flex justify-between items-center">
      <div class="flex space-x-5">
        <router-link
          to="/admin/rate"
          class="bg-white text-black rounded-full px-4 py-2 text-base font-medium"
        >
          RATE
        </router-link>
        <router-link
          to="/admin/tariff"
          class="bg-[#B659A2] text-white rounded-full px-4 py-2 text-base font-medium"
        >
          TARIFFS
        </router-link>
      </div>

      <div
        class="w-[500px] hidden mx-2 bg-[#ECECEC] rounded-md lg:flex ring-1 ring-[#B659A2CC]"
      >
        <input
          type="search"
          v-model.trim="serachQuery"
          name="search"
          placeholder="Keyword : HS CODE and HS DESCRIPTION"
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
      <Table_Tariff :tariffData="filteredTariffData" />
    </div>
    <Update
      v-if="updateModal"
      :handleUpdateModal="handleUpdateModal"
      :currentTab="'tariff'"
    />
  </div>
</template>
<!-- eslint-disable -->

<script>
import { mapState } from "vuex";

import axios from "@/Utils/axios.config.js";
import Table_Tariff from "../../components/Table_Tariff.vue";
import Update from "../../components/Update.vue";
import Cookies from "js-cookie";

export default {
  name: "rate",
  components: { Table_Tariff, Update },

  data() {
    return {
      tableData: null,
      isLoading: false,
      updateModal: false,
      isLoading: false,
      tariffData: null,
      serachQuery: "",
      prevTariff: "",
      nextTariff: "",
      urlTariff: "/api/v1/tariff/",
      axiosConfig: "",
      PageNumber: null,
    };
  },

  computed: {
    ...mapState(["calculationData", "ratesList"]),

    getTariffUpdatedDate() {
      if (this.calculationData?.tariff) {
        return new Date(
          this.calculationData.tariff[0]?.date_uploaded //Pick the first data
        ).toLocaleDateString("en-GB");
      }
      return "Loading...";
    },

    filteredTariffData() {
      if (this.calculationData?.tariff) {
        return this.calculationData.tariff.filter(
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
    // prevPageNumber() {
    //   const param = new URLSearchParams(this.nextTariff);
    //   const PageNumber = param.get("offset");
    //   //PageNumber is gotten as a string that y (+) is to convert to interger
    //   return (+PageNumber - 20) / 20 + 1;
    // },
    // nextPageNumber() {
    //   const param = new URLSearchParams(this.nextTariff);
    //   const PageNumber = param.get("offset");
    //   //PageNumber is gotten as a string that y (+) is to convert to interger

    //   return +PageNumber / 20 + 1;
    // },
  },
  mounted() {
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // this.fetchTariff(this.urlTariff);
    this.getCalculationData();
  },

  methods: {
    async getCalculationData() {
      this.$store.dispatch("setLoading", true);
      //tariffdata is Fetched due to the rate change date on the invoice to be printed
      try {
        const response = await axios.get("/api/v1/data/", this.axiosConfig);
        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        this.$store.dispatch("fetchCalculationData", response.data);
      } catch (err) {
        this.$store.dispatch("setLoading", false);
        this.isLoading = false;

        console.log(err);
      }
    },
    // async fetchTariff(urlTariff) {
    //   this.$store.dispatch("setLoading", true);
    //   this.isLoading = true;

    //   try {
    //     const [response1] = await Promise.all([
    //       axios.get(urlTariff, this.axiosConfig),
    //     ]);
    //     this.tariffData = response1.data;

    //     this.prevTariff = response1.data.previous;
    //     this.nextTariff = response1.data.next;
    //     console.log(this.prevTariff);
    //     console.log(this.nextTariff);

    //     console.log("Prev page:", this.prevPageNumber);
    //     console.log("Next page:", this.nextPageNumber);

    //     this.$store.dispatch("setLoading", false);
    //     this.isLoading = false;

    //     this.$store.dispatch("tariffList", response1.data);
    //   } catch (err) {
    //     this.$store.dispatch("setLoading", false);
    //     this.isLoading = false;

    //     console.log(err);
    //   }
    // },

    handleUpdateModal() {
      this.updateModal = !this.updateModal;
    },
    nextHandler() {
      //Get next string api

      const getNextTariffApi = this.nextTariff.replace(
        "https://valuehandler.herokuapp.com",
        ""
      );
      this.urlTariff = getNextTariffApi;
      this.fetchTariff(this.urlTariff);
    },
    prevHandler() {
      //Get Prev string api

      const getPrevTariffApi = this.prevTariff.replace(
        "https://valuehandler.herokuapp.com",
        ""
      );
      this.urlTariff = getPrevTariffApi;
      this.fetchTariff(this.urlTariff);
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
