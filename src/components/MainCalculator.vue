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
            <div
              class="mt-2 w-full cursor-pointer items-center relative px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
            >
              <div class="flex justify-between w-full">
                <input
                  @focus="setShowHscode('focus')"
                  type="number"
                  min="0"
                  required
                  placeholder="Select HSCODE Code"
                  class="text-sm md:text-xl truncate outline-none w-full bg-transparent"
                  v-model="selectedCode.code"
                />
                <button
                  @click="setShowHscode"
                  class="outline-none transform transform-translate duration-500"
                  :class="showHscode ? 'rotate-180' : 'rotate-0'"
                >
                  <i class="fa-solid fa-caret-down text-3xl text-[#777]"></i>
                </button>
              </div>
              <div
                v-if="showHscode"
                class="absolute z-[2] bg-gray-50 rounded top-[56px] inset-x-0 max-h-[200px] scrollbar-thin overflow-y-auto overflow-x-hidden flex flex-col"
              >
                <div v-if="filteredCetcode.length > 0">
                  <div
                    v-for="(item, idx) in filteredCetcode"
                    :key="idx"
                    @click="setHscode(item)"
                    class="p-4 mt-1 bg-gray-100 hover:bg-gray-300"
                  >
                    {{ item.hscode }}
                  </div>
                </div>
                <div v-else class="p-4 mt-1 bg-gray-100 hover:bg-gray-300">
                  No data available
                </div>
              </div>
            </div>
          </div>
          <div>
            <label for="hscode" class="font-medium text-sm md:text-base"
              >HS-CODE Description</label
            >
            <div
              class="mt-2 w-full cursor-pointer items-center relative px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
            >
              <div class="flex justify-between w-full">
                <input
                  @focus="setShowHscodeDesc('focus')"
                  required
                  placeholder="HS Description"
                  type="text"
                  class="text-sm md:text-xl truncate outline-none w-full bg-transparent"
                  v-model="selectedCode.description"
                />

                <button
                  @click="setShowHscodeDesc"
                  class="outline-none transform transform-translate duration-500"
                  :class="showHscodeDesc ? 'rotate-180' : 'rotate-0'"
                >
                  <i class="fa-solid fa-caret-down text-3xl text-[#777]"></i>
                </button>
              </div>
              <div
                v-if="showHscodeDesc"
                class="absolute bg-gray-50 rounded top-[56px] inset-x-0 max-h-[200px] scrollbar-thin overflow-y-auto overflow-x-hidden flex flex-col"
              >
                <div v-if="filteredCetDesc.length > 0">
                  <div
                    v-for="(item, idx) in filteredCetDesc"
                    :key="idx"
                    @click="setHscode(item)"
                    class="p-4 mt-1 bg-gray-100 hover:bg-gray-300"
                  >
                    {{ item.hs_description }}
                  </div>
                </div>
                <div v-else class="p-4 mt-1 bg-gray-100 hover:bg-gray-300">
                  No data available
                </div>
              </div>
            </div>
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
            class="text-sm md:text-xl truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
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
              <div
                class="mt-2 w-full cursor-pointer items-center relative px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
              >
                <div class="flex justify-between w-full">
                  <input
                    type="text"
                    @focus="setShowCurrency('focus')"
                    required
                    placeholder="Click to select currency"
                    class="text-sm md:text-xl truncate outline-none w-full bg-transparent"
                    v-model="selectedCurrency.currency_code"
                  />
                  <button
                    @click="setShowCurrency"
                    class="outline-none transform transform-translate duration-500"
                    :class="showCurrency ? 'rotate-180' : 'rotate-0'"
                  >
                    <i class="fa-solid fa-caret-down text-3xl text-[#777]"></i>
                  </button>
                </div>
                <div
                  v-if="showCurrency"
                  class="absolute z-50 bg-gray-50 rounded top-[56px] inset-x-0 max-h-[200px] scrollbar-thin overflow-y-auto overflow-x-hidden flex flex-col"
                >
                  <div v-if="filteredCurrency.length > 0">
                    <div
                      v-for="(item, idx) in filteredCurrency"
                      :key="idx"
                      @click="setCurrency(item)"
                      class="p-4 mt-1 bg-gray-100 hover:bg-gray-300"
                    >
                      {{ item.currency_code }}
                    </div>
                  </div>
                  <div v-else class="p-4 mt-1 bg-gray-100 hover:bg-gray-300">
                    No data available
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="flex items-center justify-between mb-2">
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
                      class="cursor-pointer w-12 h-6 rounded-[25px] p-1 transform transition-all duration-300"
                    >
                      <div
                        @click="handleInsuranceType"
                        :class="
                          insuranceType == 'actual'
                            ? ' bg-pink-500'
                            : 'translate-x-6 bg-gray-600'
                        "
                        class="transform transition-all duration-300 w-4 h-4 rounded-full"
                      ></div>
                    </div>
                  </div>

                  <div
                    title="Switch between insurance this.actual or insurance percentage"
                    class="pr-2"
                  >
                    <i
                      class="fa fa-info-circle text-2xl"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
              <input
                required
                placeholder="0"
                type="number"
                step="any"
                min="0"
                class="text-sm md:text-xl truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
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
                class="text-sm md:text-xl truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
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
                class="text-sm md:text-xl truncate w-full px-4 py-3 rounded-md border border-[#DB44C9] bg-[#ECD0E9] outline-none"
                v-model="item.freight"
              />
            </div>
          </div>
        </div>

        <div class="my-10 flex justify-center">
          <input
            class="bg-[#B659A2] text-white cursor-pointer font-bold text-sm md:text-xl px-8 py-3 flex justify-center rounded-md max-w-max uppercase"
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

export default {
  props: [],
  components: { Result, Loading },

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
      selectedCurrency: { currency_code: "" },
      selectedCode: {
        code: "",
        description: "",
      },
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
          this.ratesList.results[0].date_uploaded
        ).toLocaleDateString(),
      };
    },
    filteredCetcode() {
      return this.calculationData.tariff.filter((item) =>
        item.hscode.includes(this.selectedCode.code)
      );
    },
    filteredCetDesc() {
      return this.calculationData.tariff.filter((item) =>
        item.hs_description
          .toLowerCase()
          .includes(this.selectedCode.description.toLowerCase())
      );
    },
    filteredCurrency() {
      return this.calculationData.rate.filter((item) =>
        item.currency_code
          .toLowerCase()
          .includes(this.selectedCurrency.currency_code.toLowerCase())
      );
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
    setHscode(value) {
      this.selectedCode.code = value.hscode;
      this.selectedCode.description = value.hs_description;
      if (this.showHscode) {
        this.showHscode = !this.showHscode;
      }
      if (this.showHscodeDesc) {
        this.showHscodeDesc = !this.showHscodeDesc;
      }
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
        hscode: parseFloat(this.selectedCode.code),
        hscode_description: this.selectedCode.description,
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
