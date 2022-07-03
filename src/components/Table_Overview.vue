<!-- eslint-disable -->
<template>
  <div>
    <Loading v-if="loading" />
    <div
      v-else
      className="table-wrapper mb-5 w-full rounded-xl shadow-xl border overflow-x-scroll lg:overflow-x-hidden pb-6 "
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
        <tbody>
          <tr
            v-for="(
              { duty, user, description, cost }, idx
            ) in tableData.results"
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
      </table>
    </div>
  </div>
</template>
<!-- eslint-disable -->
<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";

export default {
  components: { Loading },
  props: { tableData: Object, loadng: Boolean },
  data() {
    return {};
  },
  computed: {
    ...mapState(["loading"]),
  },
};
</script>
<!-- eslint-disable -->

<style >
.th_bg{
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
