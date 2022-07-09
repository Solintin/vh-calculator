<!-- eslint-disable -->
<template>
  <div>
    <Loading v-if="loading" />
    <div
      v-else
      class="table-wrapper mb-5 w-full rounded-xl shadow-xl border overflow-x-scroll lg:overflow-x-hidden pb-6"
    >
      <table class="w-full items-center table-auto">
        <thead>
          <tr class="font-bold bg-[#DBEBFF]">
            <th class="px-3 py-5 leading-5 text-center whitespace-nowrap">
              User Email
            </th>
            <th class="px-3 py-5 leading-5 text-center whitespace-nowrap">
              Item Role
            </th>
            <th class="px-3 py-5 leading-5 text-center whitespace-nowrap">
              Action
            </th>
          </tr>
        </thead>
        <tbody v-if="usersData && usersData.length > 0">
          <tr
            v-for="({ email, id, user_type }, idx) in usersData"
            :class="`${
              idx % 2 === 0 ? '' : 'bg-gray-100'
            } text-base font-medium hover:bg-gray-200`"
            :key="idx"
          >
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ email }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ user_type }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              <button
                title="Change user role"
                @click="handleRole(id, user_type)"
                class="text-blue-600 rounded p-2 text-base cursor-pointer bg-[#EFEFEF]"
              >
                CHANGE ROLE
              </button>
            </td>
          </tr>
        </tbody>
        <tbody v-else class="flex justify-center">
          <h1 class="text-center py-4 text-lg font-medium text-red-500">
            No result found
          </h1>
        </tbody>
      </table>
      <div v-if="usersData && usersData.length > 0">
        <Pagination
          :next="next"
          :prev="prev"
          :nextHandler="nextHandler"
          :prevHandler="prevHandler"
        />
      </div>
    </div>
  </div>
</template>

<!-- eslint-disable -->

<script>
import axios from "@/Utils/axios.config.js";
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import Pagination from "./DataPagination.vue";

export default {
  components: { Loading, Pagination },
  props: {
    usersData: Array,
    prev: String,
    next: String,
    nextHandler: Function,
    prevHandler: Function,
  },
  computed: {
    ...mapState(["loading"]),
  },
  methods: {
    handleUserType(userType) {
      if (userType == "Super Admin") {
        return "Admin";
      } else {
        return "Super Admin";
      }
    },
    handleRole(id, user_type) {
      const getUserType = this.handleUserType(user_type);
      this.$store.dispatch("setLoading", true);

      axios
        .put(`/account/user/${id}/`, {
          user_type: getUserType,
        })
        .then((response) => {
          location.reload();
          this.$store.dispatch("setLoading", false);
          // calculationList(response.data);
        })
        .catch((error) => {
          this.$store.dispatch("setLoading", false);
        });
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped></style>
