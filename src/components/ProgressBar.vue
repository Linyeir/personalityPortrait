<template>
  <div class="relative col-span-2 z-0 h-2 w-full rounded-full bg-gray-200 dark:bg-slate-900">
    <div
      class="progressbar h-full rounded-full bg-green-500 dark:bg-purple-700"
      role="progressbar"
      :style="progressBarStyle"
      :aria-valuenow="percentage"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      <span class="flex h-full items-center">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
  props: {
    percentage: {
      type: Number,
      default: 0
    }
  },
  computed: {
    progressBarStyle() {
      return {
        width: `${this.percentage}%`
      }
    }
  }
}
</script>

<style scoped>
.progressbar {
  transition: width 0.25s ease, background-color 0.25s ease;
}
</style>
