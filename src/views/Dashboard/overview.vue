<!-- eslint-disable -->
<template>
  <div>
    <div class="py-[50px] px-[70px]">
      <div class="flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold text-[#515352]">Recent Calculations</h1>
        </div>

        <div
          class="w-[500px] bg-[#ECECEC] rounded-md flex ring-1 ring-[#B659A2CC]"
        >
          <input
            type="text"
            @input="getSearchQuery($event)"
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
      </div>
      <div class="mt-24 table_overview">
        <Table_Overview
          :filteredTableData="filteredTableData"
          :loading="isLoading"
          :next="next"
          :prev="prev"
          :nextHandler="nextHandler"
          :prevHandler="prevHandler"
          :prevPageNumber="prevPageNumber"
          :nextPageNumber="nextPageNumber"
        />
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "@/Utils/axios.config.js";
import Table_Overview from "../../components/Table_Overview.vue";
import Cookies from "js-cookie";

export default {
  name: "overview",
  components: { Table_Overview },

  data() {
    return {
      tableData: null,
      isLoading: true,
      searchQuery: "",
      prev: "",
      next: "",
      url: "/api/v1/calculation/",
      axiosConfig: "",
    };
  },
  mounted() {
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    this.fetchCalculations(this.url);
  },

  computed: {
    filteredTableData() {
      if (this.tableData !== null) {
        return this.tableData.results.filter(
          (item) =>
            item.user.email
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(this.searchQuery.toLowerCase())
        );
      }
    },
    prevPageNumber() {
      const param = new URLSearchParams(this.next);
      const PageNumber = param.get("offset");
      //PageNumber is gotten as a string that y (+) is to convert to interger
      return (+PageNumber - 20) / 20 + 1;
    },
    nextPageNumber() {
      const param = new URLSearchParams(this.next);
      const PageNumber = param.get("offset");
      //PageNumber is gotten as a string that y (+) is to convert to interger

      return +PageNumber / 20 + 1;
    },
  },
  methods: {
    getSearchQuery(e) {
      this.searchQuery = e.target.value;
    },
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
    async fetchCalculations(url) {
      this.$store.dispatch("setLoading", true);
      await axios
        .get(url, this.axiosConfig)
        .then((response) => {
          this.$store.dispatch("setLoading", false);
          this.isLoading = false;
          // calculationList(response.data);
          this.tableData = response.data;
          this.prev = response.data.previous;
          this.next = response.data.next;
        })
        .catch((error) => {
          this.$store.dispatch("setLoading", false);
          this.isLoading = false;
        });
    },

    nextHandler() {
      //Get next string api
      const getNextApi = this.next.replace(
        "https://valuehandler.herokuapp.com",
        ""
      );
      this.url = getNextApi;
      this.fetchCalculations(this.url);
    },
    prevHandler() {
      //Get Prev string api
      const getPrevApi = this.prev.replace(
        "https://valuehandler.herokuapp.com",
        ""
      );
      this.url = getPrevApi;
      this.fetchCalculations(this.url);
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.table_overview {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
</style>
