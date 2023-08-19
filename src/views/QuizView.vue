<template lang="">
  <div class="m-4 flex flex-col items-center justify-center gap-8 md:h-screen">
    <div class="flex h-96 w-full max-w-4xl justify-self-end md:w-3/4">
      <div
        class="w-full self-end overflow-hidden rounded-xl bg-white p-8 shadow-lg dark:bg-slate-800 md:p-20"
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

    <div class="mt-0 grid w-full grid-cols-4 grid-rows-1 gap-2 md:gap-4">
      <button
        @click="goToPreviousQuestion"
        :disabled="isAtFirstQuestion"
        class="rounded-md text-xs transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
      >
        <i class="bi bi-arrow-left px-3 text-xs"></i>{{ $t('texts.goBack') }}
      </button>
      <progress-bar :percentage="(answersSum * 100) / totalQuestions" />
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
    const quizStore = useQuizStore()
    const answersSum = computed(() => quizStore.sumOfAnswers)
    const totalQuestions = computed(() => quizStore.totalQuestions)
    const questionKeys = computed(() => Object.keys(quizStore.questions))

    const currentQuestionIndex = ref(quizStore.sumOfAnswers)
    const currentQuestionKey = computed(
      () => questionKeys.value[currentQuestionIndex.value] || null
    )

    // Method to navigate to the next question
    const storeAnswerAndGoToNext = ({ questionKey, answer }: UpdateEvent) => {
      quizStore.answers[questionKey] = answer
      currentQuestionIndex.value++
    }

    // Method to navigate to previous question
    const goToPreviousQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value--
      }
    }

    // Determine if we are at the first question
    const isAtFirstQuestion = computed(() => currentQuestionIndex.value === 0)

    return {
      currentQuestionKey,
      answersSum,
      totalQuestions,
      storeAnswerAndGoToNext,
      goToPreviousQuestion,
      isAtFirstQuestion
    }
  }
})
</script>
<style lang=""></style>
