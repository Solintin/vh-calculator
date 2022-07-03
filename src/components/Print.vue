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
            {{ result.selectedCode.description }}
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
      <div class="padding flex justify-between pr-20">
        <div class="font-medium">FOB: {{ result.item.fob }} {{ result.selectedCurrency.currency_code }}</div>
        <div class="font-medium">
          Insurance: {{ Freight }} {{ result.selectedCurrency.currency_code }}
        </div>
        <div class="font-medium">
          Freight: {{ Insurance }} {{ result.selectedCurrency.currency_code }}
        </div>
      </div>

      <div class="tab mt-5 px-10">
        <div class="grid grid-cols-12 border-b-2 pb-6">
          <div class="col-span-11 pr-10 text-lg font-medium">Result</div>
          <div class="col-span-1 text-lg font-medium">NGN </div>
        </div>
        <div class="divide-y-2">
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-11">
              <p class="text-gray-500 font-medium">
                CIF (Sum of FOB, Insurance and Freight
              </p>
            </div>
            <div class="col-span-1">{{result.cif}} NGN </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-11">
              <p class="text-gray-500 font-medium">CIF</p>
            </div>
            <div class="col-span-1">{{result.cf}} NGN </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-11">
              <p class="text-gray-500 font-medium">ID</p>
            </div>
            <div class="col-span-1">{{result.id}} NGN </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-11">
              <p class="text-gray-500 font-medium">Surcharge</p>
            </div>
            <div class="col-span-1">{{result.sc}} NGN </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-11">
              <p class="text-gray-500 font-medium">CISS (1% of FOB value)</p>
            </div>
            <div class="col-span-1">{{result.ciss}} NGN </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-11">
              <p class="text-gray-500 font-medium">ETLS (0.5% of CIF)</p>
            </div>
            <div class="col-span-1">{{result.etls}} NGN </div>
          </div>
          <div class="grid grid-cols-12 py-3">
            <div class="col-span-11">
              <p class="text-gray-500 font-medium">VAT</p>
            </div>
            <div class="col-span-1"> {{result.vat}} NGN </div>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-12 mt-10 text-lg font-medium">
        <div class="col-span-5">
          <p class="">TOTAL IMPORT DUTY PAYABLE:</p>
        </div>
        <div class="col-span-7">{{ result.result_NGN }} NGN</div>
      </div>
      <div class="grid grid-cols-12 text-lg font-medium">
        <div class="col-span-5">
          <p class="">SUM TOTAL:</p>
        </div>
        <div class="col-span-7">{{ result.total_NGN }} NGN</div>
      </div>
      <p class="success padding2">
        Rates used for this calculation are based on last updated value at
        {{ result.dateTime }}
      </p>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
export default {
  name: "ResultCmp",
  props: ["result"],
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
  padding-top: 150px;
  color: red;
}
</style>
