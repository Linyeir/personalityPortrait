<template>
  <div>
    <p v-if="scores" class="my-1 text-sm">
      This results have been shared with you and are not based on your answered questions
    </p>
    <div
      v-for="(score, category) in resolvedScores"
      :key="category"
      class="my-3 grid grid-cols-2 grid-rows-2 gap-1 md:my-1 md:grid-cols-3 md:grid-rows-1 md:gap-4"
    >
      <!-- Left (Normal) Label -->
      <p class="order-1 col-span-1 text-left md:text-right">
        {{ $t('styles.' + category) }}
      </p>

      <!-- Progress Bar (takes 2 fractions) -->
      <div class="order-3 col-span-2 md:col-span-1 md:self-center">
        <progress-bar :percentage="(score * 100) / categories[category]" class="mx-2 mb-2" />
      </div>

      <!-- Right (Extreme) Label -->
      <p class="order-2 col-span-1 text-right md:order-last md:col-span-1 md:text-left">
        {{ $t('disorders.' + category) }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import ProgressBar from '../components/ProgressBar.vue'
import { useQuizStore } from '../stores/QuizStore'

export default defineComponent({
  components: {
    ProgressBar
  },
  props: {
    scores: {
      type: Object,
      default: null
    }
  },
  computed: {
    resolvedScores(): Dictionary {
      // If categoryScores prop is provided, use it.
      // Otherwise, load from Pinia store.
      return this.scores || useQuizStore().scores
    }
  },
  setup() {
    const quizStore = useQuizStore()
    onMounted(() => {
      quizStore.calculateCategoryScores()
    })
    const categories = quizStore.categories
    return {
      categories
    }
  }
})
</script>
<style lang=""></style>
