<template>
  <div class="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
    <div
      class="progressbar h-full rounded-full"
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
        width: `${this.percentage}%`,
        backgroundColor: `hsl(${Math.round(this.percentage * 1.2)},100%,50%)`
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
