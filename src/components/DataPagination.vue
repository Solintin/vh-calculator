<!-- eslint-disable -->
<template>
  <div class="flex w-full justify-between px-10 items-center mt-5">
    <button
      @click="prevHandler"
      :disabled="prev === null"
      :class="prev === null ? 'opacity-0' : 'opacity-100'"
      class="py-2 px-6 text-[#DB44C9] space-x-2 flex items-center font-medium rounded"
    >
      <i class="fa-solid fa-arrow-left mt-[2px]"></i> <span> Prev ({{prevPageNumber}}) </span>
    </button>
    <button
      @click="nextHandler"
      :disabled="next === null"
      :class="next === null ? 'opacity-0' : 'opacity-100'"
      class="py-2 px-6 text-[#DB44C9] space-x-2 flex items-center font-medium rounded"
    >
      <span> Next ({{nextPageNumber}}) </span>
      <i class="fa-solid fa-arrow-right mt-[2px]"></i>
    </button>
  </div>
</template>
<!-- eslint-disable -->

<script>
export default {
  props: {
    prev: String,
    next: String,
    nextHandler: Function,
    prevHandler: Function,
    prevPageNumber: Number,
    nextPageNumber: Number,
  },
};
</script>

<style></style>
