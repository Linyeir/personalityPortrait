<template lang="">
  <div class="flex h-5/6 flex-col items-center justify-between">
    <div
      class="mt-20 w-3/4 max-w-4xl overflow-hidden rounded-xl bg-white p-20 shadow-lg dark:bg-slate-800"
    >
      <Question
        v-if="currentQuestionKey"
        :questionKey="currentQuestionKey"
        @update="storeAnswerAndGoToNext"
      />
      <div v-if="allQuestionsAnswered">
        <router-link
          to="/results"
          active-class="bg-slate-100 dark:bg-slate-700"
          class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
        >
          <i class="bi bi-check px-3"></i>{{ $t('submitQuiz') }}</router-link
        >
      </div>
    </div>

    <div class="w-3/4">
      <progress-bar :percentage="(answersSum * 100) / totalQuestions" class="mx-2 mb-2" />
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useQuizStore } from '../stores/QuizStore'
import Question from '../components/Question.vue'
import ProgressBar from '../components/ProgressBar.vue'

interface UpdateEvent {
  questionKey: string
  answer: number
}

export default defineComponent({
  // type inference enabled
  name: 'QuizView',
  components: {
    Question,
    ProgressBar
  },
  setup() {
    const quizStore = useQuizStore() // **2. Use the Pinia Store**
    const questionKeys = ref(Object.keys(quizStore.questions)) // **Use questions from the store**
    const answersSum = computed(() => quizStore.sumOfAnswers)
    const totalQuestions = computed(() => quizStore.totalQuestions)

    const currentQuestionIndex = ref(0)

    const currentQuestionKey = ref<string | null>(questionKeys.value[currentQuestionIndex.value])

    const storeAnswerAndGoToNext = ({ questionKey, answer }: UpdateEvent) => {
      quizStore.answers[questionKey] = answer // **Update answers in the store**
      currentQuestionIndex.value += 1

      if (currentQuestionIndex.value < questionKeys.value.length) {
        currentQuestionKey.value = questionKeys.value[currentQuestionIndex.value]
      } else {
        currentQuestionKey.value = null
      }
      console.log(quizStore.answers) // **Log answers from the store**
    }

    return {
      currentQuestionKey,
      answersSum,
      totalQuestions,
      allQuestionsAnswered: computed(() => currentQuestionKey.value === null),
      storeAnswerAndGoToNext
    }
  }
})
</script>
<style lang=""></style>
