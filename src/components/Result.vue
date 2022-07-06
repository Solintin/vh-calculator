<!-- eslint-disable -->

<template>
  <div class="layout">
    <div class="update_box py-8 px-4 md:px-8 space-y-8">
      <h1 class="text-xl font-medium text-center mb-3 underline">
        Calculation Details
      </h1>

      <div class="divide-y-4 capitalize text-base md:text-lg font-medium">
        <div class="flex justify-between items-center py-4">
          <div class="">Total import duty payable</div>
          <div class="ml-2">NGN {{ digitFormatter(result.result) }}</div>
        </div>
        <div class="flex justify-between items-center py-4">
          <div class="">Sum Total</div>
          <div class="ml-2">NGN {{ digitFormatter(result.total) }}</div>
        </div>
        <div class="flex justify-between items-center py-4">
          <div class="">Total import duty payable</div>
          <div class="ml-2">
            {{ result.selectedCurrency.currency_code}}
            {{ digitFormatter(result.result_NGN) }}
          </div>
        </div>
        <div class="flex justify-between items-center py-4">
          <div class="">Sum Total</div>
          <div class="ml-2">
            {{ result.selectedCurrency.currency_code}} {{ digitFormatter(result.total_NGN) }}
          </div>
        </div>
      </div>

      <div class="flex item-center space-x-10 justify-center py-2">
        <button
          @click="print"
          class="bg-green-600 flex justify-center items-center space-x-2 max-w-max rounded-md px-5 py-2 text-base font-medium text-white"
        >
          <div>Print Result</div>
          <i class="fa-solid fa-print text-xl"></i>
        </button>
        <button
          @click="setShowResult"
          class="flex justify-center max-w-max rounded-md px-5 py-2 text-base font-medium bg-red-600 text-white"
        >
          <span>Cancel</span>
        </button>
      </div>
    </div>
    <div>
      <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1100"
        filename="Result"
        :pdf-quality="2"
        :manual-pagination="true"
        pdf-format="a4"
        pdf-orientation="portrait"
        pdf-content-width="800px"
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <!-- PDF Content Here -->
      <Print
        slot="pdf-content"
        :result="result"
      
        
      />
      </vue-html2pdf>
    </div>
  </div>
</template>
<!-- eslint-disable -->

<script>
import { mapState } from "vuex";
import Print from "./Print";
import { digitFormatter } from "@/Utils/helper_function";
import VueHtml2pdf from "vue-html2pdf";

export default {
  components: {
    Print,
    VueHtml2pdf,
  },
  props: {
    setShowResult: Function,
    result: Object,
    
  },

  data() {
    return {};
  },
 
  computed: {
    ...mapState(["loading"]),
    htmlToPdfOptions() {
      return {
        margin: 0,

        filename: "Result.pdf",

        image: {
          type: "jpeg",
          quality: 0.98,
        },

        enableLinks: true,

        html2canvas: {
          scale: this.controlValue.pdfQuality,
          useCORS: true,
        },

        jsPDF: {
          unit: "in",
          format: this.controlValue.pdfFormat,
          orientation: this.controlValue.pdfOrientation,
        },
      };
    },
  },
  methods: {
    print() {
      // Pass the element id here
      this.$refs.html2Pdf.generatePdf();
    },
    digitFormatter(input) {
      return digitFormatter(input);
    },
  },
};
</script>
<!-- eslint-disable -->

<style scoped>
.layout {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  max-height: 100vh;
  z-index: 1;
  background: rgba(0, 0, 0, 0.65);
  display: grid;
  place-content: center;
  /* pointer-events: none; */
}
.update_box {
  @apply shadow-lg bg-white rounded-lg;
  z-index: 2;
  min-width: 375px;
}
</style>
