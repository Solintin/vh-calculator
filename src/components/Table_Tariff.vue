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
            <th className="px-3 py-5 leading-5 text-left whitespace-nowrap  ">
              HSCODE DESCRIPTION
            </th>
            <th className="px-3 py-5 leading-5 text-left whitespace-nowrap  ">
              HSCODE
            </th>
            <th className="px-3 py-5 leading-5 text-left whitespace-nowrap  ">
              SU
            </th>
            <th className="px-3 py-5 leading-5 text-left whitespace-nowrap  ">
              ID
            </th>
            <th className="px-3 py-5 leading-5 text-left whitespace-nowrap  ">
              VAT
            </th>
            <th className="px-3 py-5 leading-5 text-left whitespace-nowrap  ">
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, idx) in tariffData.results"
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
      </table>
      <Update_Tariff
        v-if="isUpdateTariff"
        :item="data"
        :setUpdateModal="update"
      />
    </div>
  </div>
</template>

<!-- eslint-disable -->

<script>
import { mapState } from "vuex";
import Loading from "./Loading.vue";
import Update_Tariff from "./Update_Tariff.vue";

export default {
  components: { Loading, Update_Tariff },
  props: { tariffData: Object },
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
      this.isUpdateRate = !this.isUpdateRate;
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped></style>
