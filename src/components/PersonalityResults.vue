<template>
  <div>
    <p v-if="scores" class="my-1 text-sm">
      This results have been shared with you and are not based on your answered questions
    </p>
    <div
      v-for="(score, category) in resolvedScores"
      :key="category"
      class="flex items-center gap-4"
    >
      <p class="w-1/4 text-right">
        {{ $t('styles.' + category) }}
      </p>
      <div class="inline w-3/4">
        <progress-bar :percentage="(score * 100) / categories[category]" class="mx-2 mb-2" />
      </div>
      <p class="w-1/4">
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
    console.log('personality results')
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
