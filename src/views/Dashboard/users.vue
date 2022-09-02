<!-- eslint-disable -->

<template>
  <div class="py-[50px] px-[70px]">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold text-[#515352]">Registered Users</h1>
      </div>

      <div
        class="w-[500px] bg-[#ECECEC] rounded-md flex ring-1 ring-[#B659A2CC]"
      >
        <input
          type="search"
          v-model.trim="serachQuery"
          name="search"
          placeholder="Keyword : email"
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
      <Table_Users
        :usersData="filteredTableData"
        :next="next"
        :prev="prev"
        :nextHandler="nextHandler"
        :prevHandler="prevHandler"
      />
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import axios from "@/Utils/axios.config.js";
import Table_Users from "@/components/Table_Users.vue";
import Cookies from "js-cookie";

export default {
  name: "overview",
  components: { Table_Users },

  data() {
    return {
      tableData: null,
      isLoading: false,
      serachQuery: "",
      next: "",
      prev: null,
      url: "/account/user/",
 mounted() {
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    this.fetchUsers();
  },
    };
  },
  mounted() {
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    this.fetchUsers();
  },

  computed: {
    filteredTableData() {
      if (this.tableData !== null) {
        return this.tableData.results.filter((item) =>
          item.email.toLowerCase().includes(this.serachQuery.toLowerCase())
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
    async fetchUsers() {
      this.$store.dispatch("setLoading", true);
      this.isLoading = true;

      await axios
        .get("/account/user/", this.axiosConfig)
        .then((response) => {
          this.$store.dispatch("setLoading", false);
          this.isLoading = false;
          // userList(response.data);
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
      this.fetchUsers(this.url, this.axiosConfig);
    },
    prevHandler() {
      //Get Prev string api
      const getPrevApi = this.prev.replace(
        "https://valuehandler.herokuapp.com",
        ""
      );
      this.url = getPrevApi;
      this.fetchUsers(this.url, this.axiosConfig);
    },
  },
};
</script>
<style scoped>
.table_overview {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
</style>
