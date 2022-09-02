<!-- eslint-disable -->
<template>
  <div class="flex w-full justify-between px-10 items-center mt-5">
    <button
      class="py-2 px-6 text-[#DB44C9] space-x-2 flex items-center font-medium rounded"
    >
      Count : {{ limit }}
    </button>
    <button
      class="py-2 px-6 text-[#DB44C9] space-x-2 flex items-center font-medium rounded"
      v-if="limit < data.length"
      @click="handleShowMore"
    >
      Next
    </button>
  </div>
</template>
<!-- eslint-disable -->

<script>
export default {
  props: {
    handleShowMore: Function,
    data: Array,
    limit: Number,
  },
};
</script>

<style></style>
