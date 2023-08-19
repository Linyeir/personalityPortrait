<template lang="">
  <div class="flex md:h-screen flex-col items-center justify-center gap-8">
    <div class="flex h-96 w-3/4 max-w-4xl justify-self-end">
      <div
        class="w-full self-end overflow-hidden rounded-xl bg-white p-8 md:p-20 shadow-lg dark:bg-slate-800"
      >
        <question-display
          v-if="currentQuestionKey"
          :questionKey="currentQuestionKey"
          @update="storeAnswerAndGoToNext"
        />
        <div v-else>
          <router-link
            to="/results"
            active-class="bg-slate-100 dark:bg-slate-700"
            class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
          >
            <i class="bi bi-check px-3"></i>{{ $t('texts.submitQuiz') }}</router-link
          >
        </div>
      </div>
    </div>

    <div class="mt-0 w-1/2">
      <progress-bar :percentage="(answersSum * 100) / totalQuestions" class="mx-2 mb-2" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useQuizStore } from '../stores/QuizStore'
import QuestionDisplay from '../components/QuestionDisplay.vue'
import ProgressBar from '../components/ProgressBar.vue'

interface UpdateEvent {
  questionKey: string
  answer: number
}

export default defineComponent({
  // type inference enabled
  name: 'QuizView',
  components: {
    QuestionDisplay,
    ProgressBar
  },
  setup() {
    const quizStore = useQuizStore() // **2. Use the Pinia Store**
    const answersSum = computed(() => quizStore.sumOfAnswers)
    const totalQuestions = computed(() => quizStore.totalQuestions)
    const currentQuestionKey = ref<string | null>(quizStore.firstUnansweredQuestionKey)

    const storeAnswerAndGoToNext = ({ questionKey, answer }: UpdateEvent) => {
      quizStore.answers[questionKey] = answer
      currentQuestionKey.value = quizStore.firstUnansweredQuestionKey // Set to the next unanswered question
    }

    return {
      currentQuestionKey,
      answersSum,
      totalQuestions,
      storeAnswerAndGoToNext
    }
  }
})
</script>
<style lang=""></style>
