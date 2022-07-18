<!-- eslint-disable -->
<template>
  <div>
    <Loading v-if="loading" />
    <div
      class="table-wrapper mb-5 w-full rounded-xl shadow-xl border overflow-x-scroll lg:overflow-x-hidden pb-6"
    >
      <table class="w-full items-center table-auto">
        <thead>
          <tr class="font-bold bg-[#DBEBFF] th_bg">
            <th class="px-3 py-5 leading-5 text-center whitespace-nowrap">
              User Email
            </th>
            <th class="px-3 py-5 leading-5 text-center whitespace-nowrap">
              Item Description
            </th>
            <th class="px-3 py-5 leading-5 text-center whitespace-nowrap">
              Custom Duty
            </th>
            <th class="px-3 py-5 leading-5 text-center whitespace-nowrap">
              Total Cost
            </th>
          </tr>
        </thead>
        <tbody v-if="filteredTableData && filteredTableData.length > 0">
          <tr
            v-for="(
              { duty, user, description, cost }, idx
            ) in filteredTableData"
            :class="`${
              idx % 2 === 0 ? '' : 'bg-gray-100'
            } text-base font-medium cursor-pointer hover:bg-gray-200`"
            :key="idx"
          >
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ user.email }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ description }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ digitFormatter(duty) }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ digitFormatter(cost) }}
            </td>
          </tr>
        </tbody>
        <tbody v-else class="flex justify-center">
          <h1 class="text-center py-4 text-lg font-medium text-red-500">
            No result found
          </h1>
        </tbody>
      </table>

      <div
        v-if="filteredTableData && filteredTableData.length > 0"
      >
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
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import Pagination from "./DataPagination.vue";
import { digitFormatter } from "@/Utils/helper_function";

export default {
  components: { Loading, Pagination },

  props: {
    filteredTableData: Array,
    loadng: Boolean,
    prev: String,
    next: String,
    nextHandler: Function,
    prevHandler: Function,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["loading"]),
  },
    methods: {
    digitFormatter(input) {
      return digitFormatter(input);
    },
  },
};
</script>
<!-- eslint-disable -->
