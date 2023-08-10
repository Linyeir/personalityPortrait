<template lang="">
  <div class="mt-20 flex items-center justify-center">
    <div
      class="w-3/4 max-w-4xl overflow-hidden rounded-xl bg-white p-20 shadow-lg dark:bg-slate-800"
    >
      <Question
        v-if="currentQuestionKey"
        :questionKey="currentQuestionKey"
        @update="storeAnswerAndGoToNext"
      />
      <div v-if="allQuestionsAnswered">
        <button
          @click="submitQuiz"
          class="items-center rounded-md bg-slate-100 p-2 transition duration-200 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import quizData from '../assets/quizData.json'
import Question from '../components/Question.vue'
import { useRouter } from 'vue-router'

interface UpdateEvent {
  questionKey: string
  answer: number
}

interface QuizData {
  [key: string]: { [key: string]: number[] }
}

export default defineComponent({
  // type inference enabled
  name: 'QuizView',
  props: {},
  components: {
    Question
  },
  data() {
    return { quiz: quizData, answers: {} }
  },
  mounted() {},
  setup() {
    const quiz = quizData as QuizData
    const questionKeys = ref(Object.keys(quiz))
    const currentQuestionIndex = ref(0)
    const currentQuestionKey = ref<string | null>(questionKeys.value[currentQuestionIndex.value])
    const answers = ref({} as { [key: string]: number })
    const router = useRouter()

    const storeAnswerAndGoToNext = ({ questionKey, answer }: UpdateEvent) => {
      answers.value[questionKey] = answer
      currentQuestionIndex.value += 1

      if (currentQuestionIndex.value < questionKeys.value.length) {
        currentQuestionKey.value = questionKeys.value[currentQuestionIndex.value]
      } else {
        currentQuestionKey.value = null
      }
      console.log(answers)
    }

    const submitQuiz = () => {
      router.push({
        name: 'ResultsView',
        params: { answers: JSON.stringify(answers.value) }
      })
    }

    return {
      currentQuestionKey,
      allQuestionsAnswered: computed(() => currentQuestionKey.value === null),
      storeAnswerAndGoToNext,
      submitQuiz
    }
  }
})
</script>
<style lang=""></style>
