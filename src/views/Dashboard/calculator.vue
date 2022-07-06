<!-- eslint-disable -->
<template>
  <div class="py-[50px]">
    <div class="mb-3 border-b border-purple-200 pl-10">
      <div class="flex text-base md:text-2xl font-medium space-x-5 container mx-auto">
        <button
          @click="switchTab('help')"
          class="outline-none"
          :class="
            Tab === 'help'
              ? 'border-4 border-gray-300 bg-gray-300 rounded-t px-5 py-2 text-white transform-translate duration-300'
              : 'text-gray-500'
          "
        >
          Help
        </button>
        <button
          @click="switchTab('calculator')"
          class="outline-none"
          :class="
            Tab === 'calculator'
              ? 'border-4 border-gray-300 bg-gray-300 rounded-t px-5 py-2 text-white transform-translate duration-300'
              : 'text-gray-500'
          "
        >
          Calculator
        </button>
      </div>
    </div>

    <Guide v-if="Tab === 'help'" />
    <Calculator v-else />
  </div>
</template>
<!-- eslint-disable -->

<script>
import Guide from "@/components/Guide.vue";
import Calculator from "@/components/MainCalculator.vue";
export default {
  name: "calculator-app",
  components: { Guide, Calculator },
  data() {
    return {
      Tab: "help",
    };
  },

  methods: {
    switchTab(currentTab) {
      this.Tab = currentTab;
    },
  },
};
</script>
<!-- eslint-disable -->

<style>
.table_calculator {
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 8px;
}
</style>
