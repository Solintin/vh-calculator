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
          <tr className="font-bold  bg-[#DBEBFF]">
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
              Currency Name
            </th>
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
              Currency Code
            </th>
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
              Exchange rate (₦)
            </th>
            <th className="px-3 py-5 leading-5 text-center whitespace-nowrap  ">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in rateData.results"
            :class="`${
              idx % 2 === 0 ? '' : 'bg-gray-100'
            } text-base font-medium  hover:bg-gray-200`"
            :key="idx"
          >
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ item.currency_name }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ item.currency_code }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              {{ item.exchange_rate }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-center">
              <button class="cursor-pointer" @click="update(item)">
                <i class="fa-solid fa-pen-to-square hover:text-[#B659A2CC]"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Update_Rate 
    v-if="isUpdateRate" :item="data" :setUpdateModal="update" />
  </div>
</template>

<!-- eslint-disable -->

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import Update_Rate from "./Update_Rate.vue";

export default {
  components: { Loading, Update_Rate },
  props: { rateData: Object, loadng: Boolean },
  computed: {
    ...mapState(["loading"]),
  },
  data() {
    return {
      data: null,
      isUpdateRate: false,
    };
  },
  methods: {
    update(item) {
      this.data = item;
      this.isUpdateRate = !this.isUpdateRate;
    },
  },
};
</script>
<!-- eslint-disable -->
