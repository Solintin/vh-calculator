<template>
    <Print
        slot="pdf-content"
        :result="[]"
        :hsCode="'selectedHscode'"
        :hsDescription="'HsDescription'"
        :itemDescription="'itemDescription'"
        :FOB="parseFloat('FOB')"
        :Freight="parseFloat('Freight')"
        :Insurance="parseFloat('InsuranceActual')"
        :importDuty="parseFloat('customDuty')"
        :sumTotal="parseFloat('sumTotal')"
        :inputCurrency="'inputCurrency'"
        :outputCurrency="'outputCurrency'"
        :dateTime="'dateTime'"
      />
</template>

<script>
import Print from "@/components/Print";

export default {
 components: {
    Print,
  },
}
</script>

<style>

</style>