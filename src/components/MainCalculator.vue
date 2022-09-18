<!-- eslint-disable -->
<template>
  <div class="md:px-10 container mx-auto">
    <div class="table_calculator">
      <form @submit="handleCalculation">
        <h1 class="my-2 text-center text-[#B659A2] text-2xl font-bold">
          Duty Calculator
        </h1>
        <div class="my-3 grid md:grid-cols-2 gap-6">
          <div>
            <label for="hscode" class="font-medium text-sm md:text-base"
              >HS-CODE</label
            >

            <model-list-select
              :list="fetchCalculationData.tariff"
              v-model="hscodeValue"
              option-value="hscode"
              option-text="hscode"
              placeholder="Select Hscode"
            >
            </model-list-select>

            <!-- <lv-dropdown
              v-model="selectedCode"
              :options="fetchCalculationData.tariff.slice(0, 1000)"
              optionLabel="hscode"
              placeholder="Select Hscode Description "
              editable
              clearable
              required
            /> -->
          </div>
          <div>
            <label for="hscode" class="font-medium text-sm md:text-base"
              >HS-CODE Description</label
            >
            <!-- <lv-dropdown
              v-model="selectedCode"
              :options="fetchCalculationData.tariff.slice(0, 1000)"
              optionLabel="hs_description"
              placeholder="Select HSCODE Description"
              editable
              clearable
              required
            /> -->
            <input
              required
              placeholder="0"
              type="text"
              readonly
              class="text-xs md:text-lg truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
              v-model="selectedCode.hs_description"
            />
          </div>
        </div>

        <div class="mt-5 w-full cursor-pointer flex flex-col space-y-4">
          <label for="hscode" class="font-medium text-sm md:text-base"
            >Item Description</label
          >

          <input
            required
            placeholder="Item description"
            type="text"
            class="text-xs md:text-lg truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
            v-model="item.description"
          />
        </div>

        <div class="mt-6 border-t-2 border-[#ECD0E9] w-full py-4 space-y-4">
          <div class="my-3 grid md:grid-cols-2 gap-6">
            <div>
              <label
                for="hscode"
                class="font-medium text-sm md:text-base uppercase"
                >Currency</label
              >

              <lv-dropdown
                v-model="selectedCurrency"
                :options="fetchCalculationData.rate"
                optionLabel="currency_code"
                placeholder="Select currency"
                editable
                clearable
                required
              />
            </div>
            <div>
              <div class="flex items-start justify-between">
                <label
                  for="hscode"
                  class="font-medium text-sm md:text-base uppercase"
                  >Insurance ({{ insuranceType }})
                </label>
                <div class="flex items-center gap-3">
                  <div class="flex items-center">
                    <div
                      @click="handleInsuranceType"
                      :class="
                        insuranceType == 'percentage'
                          ? 'bg-red-300'
                          : 'bg-gray-200'
                      "
                      class="cursor-pointer w-9 h-4 rounded-[25px] p-1 transform transition-all duration-300"
                    >
                      <div
                        @click="handleInsuranceType"
                        :class="
                          insuranceType == 'actual'
                            ? ' bg-pink-500'
                            : 'translate-x-4 bg-gray-600'
                        "
                        class="transform transition-all duration-300 w-2 h-2 rounded-full"
                      ></div>
                    </div>
                  </div>

                  <div
                    title="Switch between insurance this.actual or insurance percentage"
                    class="pr-2"
                  >
                    <i class="fa fa-info-circle text-xl" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
              <input
                required
                placeholder="0"
                type="number"
                step="any"
                min="0"
                class="text-xs md:text-lg truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
                v-model="item.insurance"
              />
            </div>
          </div>

          <div class="my-3 grid md:grid-cols-2 gap-6">
            <div>
              <label
                for="hscode"
                class="font-medium text-sm md:text-base uppercase"
                >FOB</label
              >
              <input
                required
                placeholder="0"
                type="number"
                step="any"
                min="0"
                class="text-xs md:text-lg truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
                v-model="item.fob"
              />
            </div>
            <div>
              <label
                for="hscode"
                class="font-medium text-sm md:text-base uppercase"
                >FREIGHT</label
              >

              <input
                required
                placeholder="0"
                type="number"
                min="0"
                step="any"
                class="text-xs md:text-lg truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
                v-model="item.freight"
              />
            </div>
          </div>
        </div>

        <div class="my-10 flex justify-center">
          <input
            class="bg-[#B659A2] text-white cursor-pointer font-bold text-xs md:text-lg px-8 py-3 flex justify-center rounded-md max-w-max uppercase"
            :class="loading ? 'cursor-wait' : null"
            :value="loading ? 'Calculating...' : 'Calculate'"
            type="submit"
          />
        </div>
      </form>
    </div>
    <Result
      v-if="showResult"
      :setShowResult="setShowResult"
      :result="resultInfo"
    />
    <Loading v-if="loading" />
  </div>
</template>

<!-- eslint-disable -->

<script>
import { mapState } from "vuex";
import axios from "@/Utils/axios.config.js";
import Result from "./Result.vue";
import Loading from "./Loading.vue";
import Cookies from "js-cookie";
import LvDropdown from "lightvue/dropdown";
import { ModelListSelect } from "vue-search-select";

export default {
  props: ["fetchCalculationData"],
  components: { Result, Loading, LvDropdown, ModelListSelect },

  data() {
    return {
      showResult: false,
      result: { details: null },
      loading: false,
      showCurrency: false,
      showHscode: false,
      showHscodeDesc: false,
      insuranceToggle: false,
      insuranceType: "actual",
      axiosConfig: "",
      selectedCurrency: null,
      selectedCode: {
        hscode: "",
        hs_description: "",
      },
      hscodeValue: "",
      item: {
        description: "",
        fob: null,
        freight: null,
        insurance: null,
      },
    };
  },

  computed: {
    ...mapState(["calculationData", "ratesList"]),
    resultInfo() {
      return {
        ...this.result.details.detail,
        selectedCode: this.selectedCode,
        selectedCurrency: this.selectedCurrency,
        item: this.item,
        dateTime: new Date(
          this.fetchCalculationData.rate[0].date_uploaded
        ).toLocaleDateString(),
      };
    },
  },
  mounted() {
    let token = Cookies.get("token");
    this.axiosConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  },
  watch: {
    hscodeValue() {
      if (this.hscodeValue.length > 7) {
        this.setHsCodeValue();
      }
    },
  },
  methods: {
    setShowResult() {
      this.showResult = !this.showResult;
    },
    setShowHscode(state) {
      if (state === "focus") {
        this.showHscode = true;
      } else if (state === "blur") {
        this.showHscode = false;
      } else {
        this.showHscode = !this.showHscode;
      }
    },
    setShowHscodeDesc(state) {
      if (state === "focus") {
        this.showHscodeDesc = true;
      } else if (state === "blur") {
        this.showHscodeDesc = false;
      } else {
        this.showHscodeDesc = !this.showHscodeDesc;
      }
    },
    setShowCurrency(state) {
      if (state === "focus") {
        this.showCurrency = true;
      } else if (state === "blur") {
        this.showCurrency = false;
      } else {
        this.showCurrency = !this.showCurrency;
      }
    },
    setHsCodeValue() {
      this.selectedCode = this.fetchCalculationData.tariff.find(
        (item) => item.hscode === this.hscodeValue
      );
    },
    handleHscodeSelection(value) {
      this.selectedCode.code = JSON.parse(value);
    },
    setCurrency(value) {
      this.selectedCurrency.currency_code = value.currency_code;
      if (this.showCurrency) {
        this.showCurrency = !this.showCurrency;
      }
    },
    handleInsuranceType() {
      this.insuranceToggle = !this.insuranceToggle;
      this.insuranceType = this.insuranceToggle ? "actual" : "percentage";
    },

    handleCalculation(e) {
      e.preventDefault();
      const data = {
        hscode: this.selectedCode.hscode,
        hscode_description: this.selectedCode.hs_description,
        item_description: this.item.description,
        currency: this.selectedCurrency.currency_code,
        fob: parseFloat(this.item.fob),
        freight: parseFloat(this.item.freight),
      };
      const calculationsDataWithActualInsurance = {
        ...data,
        insurance: parseFloat(this.item.insurance),
      };
      const calculationsDataWithPercentageInsurance = {
        ...data,
        insurance_percentage: parseFloat(this.item.insurance),
      };
      this.loading = true;
      this.$store.dispatch("setLoading", true);

      axios
        .post(
          "/api/v1/calculation/",
          this.insuranceType == "actual"
            ? calculationsDataWithActualInsurance
            : calculationsDataWithPercentageInsurance,
          this.axiosConfig
        )
        .then((response) => {
          this.result.details = response.data;
          this.$store.dispatch("setLoading", false);

          this.loading = false;
          this.showResult = true;
        })
        .catch((error) => {
          this.$toast.error(JSON.stringify(error.response.data));

          this.loading = false;
        });
    },
  },
};
</script>

<!-- eslint-disable -->

<style scoped>
.table_calculator {
  margin: 1rem;
  padding: 1rem;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background: #b659a270;
}
</style>
