<template lang="">
  <div class="-mt-12 flex h-screen items-center justify-center">
    <div class="max-w-4xl overflow-hidden rounded-xl bg-white p-20 shadow-lg dark:bg-slate-800">
      <div class="mb-5 text-4xl font-light">{{ $t('texts.introductionTitle') }}</div>
      <p class="text-base" v-html="$t('texts.introText')">
      </p>
      <div class="flex justify-end">
        <router-link
          to="/quiz"
          class="mt-8 rounded-md bg-green-500 px-8 py-2 text-left transition duration-200 hover:bg-green-600 dark:bg-purple-700 hover:dark:bg-purple-800"
        >
          {{ $t('texts.startButton') }}</router-link
        >
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  // type inference enabled
  props: {},
  data() {
    return {}
  },
  mounted() {}
})
</script>
<style lang=""></style>
