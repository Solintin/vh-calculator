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
        <tbody v-if="rateData && rateData.length > 0">
          <tr
            v-for="(item, idx) in rateData"
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
        <tbody v-else class="flex justify-center">
          <h1 class="text-center py-4 text-lg font-medium text-red-500">
            No result found
          </h1>
        </tbody>
      </table>
      <div class="flex justify-between px-10 items-center mt-5">
        <button
          @click="prevHandler"
          :disabled="prev === null"
          :class="
            prev === null
              ? 'bg-green-200 cursor-not-allowed'
              : 'bg-green-500 '
          "
          class="py-2 px-6 text-white text-xl font-medium rounded"
        >
          Prev
        </button>
        <button
          @click="nextHandler"
          :disabled="next === null"
          :class="
            next === null
              ? 'bg-green-200 cursor-not-allowed'
              : 'bg-green-500 '
          "
          class="py-2 px-6 text-white text-xl font-medium rounded"
        >
          Next
        </button>
      </div>
    </div>
    <Update_Rate v-if="isUpdateRate" :item="data" :setUpdateModal="update" />
  </div>
</template>

<!-- eslint-disable -->

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import Update_Rate from "./Update_Rate.vue";

export default {
  components: { Loading, Update_Rate },
  props: {
    rateData: Array,
    loadng: Boolean,
    prev: String,
    next: String,
    nextHandler: Function,
    prevHandler: Function,
  },
  computed: {
    ...mapState(["loading"]),
  },
  data() {
    return {
      data: null,
      isUpdateRate: false,
    };
  },
  mounted() {
console.log(this.prevRate);
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
