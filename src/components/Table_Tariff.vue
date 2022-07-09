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
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
              HSCODE DESCRIPTION
            </th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
              HSCODE
            </th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">SU</th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">ID</th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">VAT</th>
            <th class="px-3 py-5 leading-5 text-left whitespace-nowrap">
              Edit
            </th>
          </tr>
        </thead>
        <tbody v-if="tariffData && tariffData.length > 0">
          <tr
            v-for="(item, idx) in tariffData"
            :class="`${
              idx % 2 === 0 ? '' : 'bg-gray-100'
            } text-base font-medium hover:bg-gray-200`"
            :key="idx"
          >
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              {{ item.hs_description }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              {{ item.hscode }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              {{ item.su }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              {{ item.id_tariff }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
              {{ item.vat }}
            </td>
            <td class="px-3 py-5 leading-5 whitespace-nowrap text-left">
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
      <div v-if="tariffData && tariffData.length > 0">
        <Pagination
          :next="next"
          :prev="prev"
          :nextHandler="nextHandler"
          :prevHandler="prevHandler"
        />
      </div>
    </div>
    <Update_Tariff
      v-if="isUpdateTariff"
      :item="data"
      :setUpdateModal="update"
    />
  </div>
</template>

<!-- eslint-disable -->

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import Update_Tariff from "./Update_Tariff.vue";
import Pagination from "./DataPagination.vue";

export default {
  components: { Loading, Update_Tariff, Pagination },
  props: {
    tariffData: Array,
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
  data() {
    return {
      data: null,
      isUpdateTariff: false,
    };
  },
  methods: {
    update(item) {
      this.data = item;
      this.isUpdateTariff = !this.isUpdateTariff;
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped></style>
