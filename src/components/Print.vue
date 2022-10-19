<!-- eslint-disable -->

<template>
  <div
    style="
      background-image: url('/Letterhead.jpg');
      background-size: contain;
      height: 1100px;
    "
    class="fill p-4"
  >
    <div class="topMargin">
      <div class="flex flex-col gap-4 font-medium">
        <div class="grid grid-cols-12">
          <div class="col-span-4">
            <p class="text-lg">HSCODE:</p>
          </div>
          <div class="col-span-8">
            {{ result.selectedCode.hscode }}
          </div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-span-4">
            <p class="text-lg">HSCODE Description:</p>
          </div>
          <div class="col-span-8">
            {{ result.selectedCode.hs_description }}
          </div>
        </div>
        <div class="grid grid-cols-12">
          <div class="col-span-4">
            <p class="text-lg">Item Description:</p>
          </div>
          <div class="col-span-8">
            {{ result.item.description }}
          </div>
        </div>
      </div>
      <div class="padding flex justify-between pr-24">
        <div class="font-medium">
          FOB: {{ result.item.fob }} {{ result.selectedCurrency.currency_code }}
        </div>
        <div class="font-medium">
          Insurance: {{ result.item.insurance }}
          {{ result.selectedCurrency.currency_code }}
        </div>
        <div class="font-medium">
          Freight: {{ result.item.freight }}
          {{ result.selectedCurrency.currency_code }}
        </div>
      </div>

      <div class="tab mt-5 px-10">
        <div class="grid grid-cols-12 border-b-2 pb-6">
          <div class="col-span-9 pr-10 text-lg font-medium">Result</div>
          <div class="col-span-3 text-lg font-medium">NGN</div>
        </div>
        <div class="divide-y-2">
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">CF <small>(Sum of FOB and Freight)</small></p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.cf_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">
                CIF <small>(Sum of FOB, Insurance and Freight)</small>
              </p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.cif_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">ID     <small>({{ result.id_percentage * 100 }}% of CIF)</small> </p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.id_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">Surcharge <small>(7% of ID)</small></p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.sc_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">CISS (1% of FOB value)</p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.ciss_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">Levy<small>({{ result.levy_percentage * 100 }}% of CIF)</small>  </p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.levy_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">Excise duty <small>({{ result.exercise_duty_percentage * 100 }}% of CIF)</small> </p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.exercise_duty_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">ETLS (0.5% of CIF)</p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.etls_NGN) }} NGN
            </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-9">
              <p class="text-gray-500 font-medium">VAT <small>({{ result.vat_percentage * 100 }}% of CIF+ID+SC+CISS+ELTS)</small> </p>
            </div>
            <div class="col-span-3">
              {{ digitFormatter(result.vat_NGN) }} NGN
            </div>
          </div>
        </div>
      </div>
      <div class="text-center text-lg font-medium">
        <p class="">
          TOTAL IMPORT DUTY PAYABLE:

          <span class="ml-3underline">
            {{ digitFormatter(result.result_NGN) }} NGN
          </span>
        </p>
      </div>
      <!-- <div class="grid grid-cols-12 text-lg font-medium">
        <div class="col-span-5">
          <p class="">SUM TOTAL:</p>
        </div>
        <div class="col-span-7 underline">
          {{ digitFormatter(result.total_NGN) }} NGN
        </div>
      </div> -->
      <!-- <p class="success padding2">
        Rates used for this calculation are based on last updated value at
        {{ result.dateTime }}
      </p> -->
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { digitFormatter } from "@/Utils/helper_function";

export default {
  name: "ResultCmp",
  props: ["result"],
  mounted() {
    console.log(this.result);
  },
  methods: {
    digitFormatter(input) {
      return digitFormatter(input);
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.topMargin {
  padding-top: 110px;
}
.padding {
  padding-top: 20px;
}
.padding2 {
  padding-top: 40px;
  color: red;
}
</style>
