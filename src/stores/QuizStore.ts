import { defineStore } from 'pinia'
import quizData from '../assets/quizData.json'

type Question = {
  [key: string]: { [key: string]: number[] }
}

type Map = {
  [key: string]: number
}

interface QuizState {
  questions: Question
  categories: Map
  answers: Map
  scores: Map
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: quizData.questions,
    categories: quizData.categories,
    answers: {},
    scores: {}
  }),
  getters: {
    sumOfAnswers(state): number {
      return Object.keys(state.answers).length
    },
    totalQuestions(state): number {
      return Object.keys(state.questions).length
    }
  },
  actions: {
    calculateCategoryScores() {
      for (const key in this.categories) {
        this.scores[key] = 0
      }

      for (const questionKey in this.questions) {
        const answer = this.answers[questionKey] || 0
        const categories = this.questions[questionKey]

        for (const category in categories) {
          this.scores[category] += categories[category][answer]
        }
      }
    }
  },
  persist: true,
})
