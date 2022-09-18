<!-- eslint-disable -->

<template>
  <div class="layout py-10">
    <div
      class="update_box max-w-4xl overflow-y-auto py-8 px-4 md:px-8 space-y-8"
    >
      <h1 class="text-xl font-medium text-center mb-3 underline">
        Calculation Details
      </h1>

      <div class="divide-y-4 capitalize text-xs md:text-lg font-medium">
        <div class="divide-y-2">
          <div
            class="grid grid-cols-12 gap-4 py-3 bg-pink-300 px-1 rounded-t-md"
          >
            <div class="col-span-7">
              <p class="text-black font-medium">Parameter</p>
            </div>
            <div class="col-span-3">Value</div>
            <div class="col-span-2">Exclude</div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">CF</p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.cf_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <!-- <LvToggleSwitch
                v-model="checked1"
                dense
                icon="light-icon-check"
              /> -->
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">
                CIF <small>(Sum of FOB, Insurance and Freight)</small>
              </p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.cif_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <!-- <LvToggleSwitch
                v-model="checked1"
                dense
                icon="light-icon-check"
              /> -->
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">ID</p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.id_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <LvToggleSwitch
                v-model="idToggle"
                dense
                icon="light-icon-check"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">Surcharge</p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.sc_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <LvToggleSwitch
                v-model="surchargeToggle"
                dense
                icon="light-icon-check"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">
                CISS <small>(1% of FOB value)</small>
              </p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.ciss_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <LvToggleSwitch
                v-model="cissToggle"
                dense
                icon="light-icon-check"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">Levy</p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.levy_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <LvToggleSwitch
                v-model="levyToggle"
                dense
                icon="light-icon-check"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">Excise duty</p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.exercise_duty_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <LvToggleSwitch
                v-model="exdutyToggle"
                dense
                icon="light-icon-check"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">
                ETLS <small>(0.5% of CIF)</small>
              </p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.etls_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <LvToggleSwitch
                v-model="etlsToggle"
                dense
                icon="light-icon-check"
              />
            </div>
          </div>
          <div class="grid grid-cols-12 gap-4 py-3 px-1">
            <div class="col-span-7">
              <p class="text-gray-500 font-medium">VAT</p>
            </div>
            <div class="col-span-3 text-right">
              {{ digitFormatter(result.vat_NGN) }} NGN
            </div>
            <div class="col-span-2">
              <LvToggleSwitch
                v-model="vatToggle"
                dense
                icon="light-icon-check"
              />
            </div>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4 py-4">
          <div class="col-span-7">
            <p class="font-medium">Total import duty payable</p>
          </div>
          <div class="col-span-3 underline">
            {{ digitFormatter(calcuateTotal) }} NGN
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
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf"
      >
        <!-- PDF Content Here -->
        <Print slot="pdf-content" :result="result" />
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
import LvToggleSwitch from "lightvue/toggle-switch";

export default {
  components: {
    Print,
    VueHtml2pdf,
    LvToggleSwitch,
  },
  props: {
    setShowResult: Function,
    result: Object,
  },

  data() {
    return {
      idToggle: true,
      surchargeToggle: true,
      cissToggle: true,
      levyToggle: true,
      exdutyToggle: true,
      etlsToggle: true,
      vatToggle: true,
    };
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
    idTotal() {
      return this.idToggle ? this.result.id_NGN : 0;
    },
    surchargeTotal() {
      return this.surchargeToggle ? this.result.sc_NGN : 0;
    },
    cissTotal() {
      return this.cissToggle ? this.result.ciss_NGN : 0;
    },
    levyTotal() {
      return this.levyToggle ? this.result.levy_NGN : 0;
    },
    exdutyTotal() {
      return this.exdutyToggle ? this.result.exercise_duty_NGN : 0;
    },
    etlsTotal() {
      return this.etlsToggle ? this.result.etls_NGN : 0;
    },
    vatTotal() {
      return this.vatToggle ? this.result.vat_NGN : 0;
    },
    calcuateTotal() {
      return (
        this.idTotal +
        this.surchargeTotal +
        this.cissTotal +
        this.levyTotal +
        this.exdutyTotal +
        this.etlsTotal +
        this.vatTotal
      );
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
  position: fixed;
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
