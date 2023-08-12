<template lang="">
  <div class="algin center -mt-12 flex h-screen flex-col items-center justify-center">
    <div
      class="w-full max-w-4xl overflow-hidden rounded-xl bg-white p-14 shadow-lg dark:bg-slate-800"
    >
      <h2 class="mb-8 text-lg">Your personality Portrait</h2>
      <div
        v-for="(score, category) in categoryScores"
        :key="category"
        class="flex items-center gap-4"
      >
        <p class="w-1/4 text-right">
          {{ $t('style' + category) }}
        </p>
        <div class="inline w-3/4">
          <progress-bar :percentage="(score * 100) / categories[category]" class="mx-2 mb-2" />
        </div>
        <p class="w-1/4">
          {{ $t('disorder' + category) }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useQuizStore } from '../stores/QuizStore'
import ProgressBar from '../components/ProgressBar.vue'

export default defineComponent({
  components: {
    ProgressBar
  },
  created() {
    const hash = this.$route.query.hash
    console.log(hash)
  },
  setup() {
    const quizStore = useQuizStore()

    onMounted(() => {
      quizStore.calculateCategoryScores()
    })

    const categoryScores = computed(() => quizStore.scores)
    const categories = quizStore.categories

    return {
      categoryScores,
      categories
    }
  }
})
</script>
<style lang=""></style>
