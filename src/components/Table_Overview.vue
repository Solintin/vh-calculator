<!-- eslint-disable -->
<template>
  <div>
    <Loading v-if="loading" />
    <div
      v-else
      className="table-wrapper mb-5 w-full   rounded-xl shadow-xl border overflow-x-scroll lg:overflow-x-hidden pb-6 "
    >
      <table className="w-full items-center table-auto ">
        <thead>
          <tr className="font-bold  bg-[#DBEBFF] th_bg">
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
              User Email
            </th>
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
              Item Description
            </th>
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
              Custom Duty
            </th>
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
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
              {{ duty }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ cost }}
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
        class="flex justify-between px-10 items-center mt-5"
      >
        <button
          @click="prevHandler"
          :disabled="prev === null"
          :class="
            prev === null ? 'bg-green-200 cursor-not-allowed' : 'bg-green-500 '
          "
          class="py-2 px-6 text-white text-xl font-medium rounded"
        >
          Prev
        </button>
        <button
          @click="nextHandler"
          :disabled="next === null"
          :class="
            next === null ? 'bg-green-200 cursor-not-allowed' : 'bg-green-500 '
          "
          class="py-2 px-6 text-white text-xl font-medium rounded"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";

export default {
  components: { Loading },
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
};
</script>
<!-- eslint-disable -->

<style>
.th_bg {
  background: #000;
}
.table-wrapper table thead tr th,
.table-wrapper table tbody tr td {
  @apply px-3 py-5 leading-5 text-center whitespace-nowrap;
}
table {
  width: 100%;
}
</style>
