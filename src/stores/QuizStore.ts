import { defineStore } from 'pinia'
import quizData from '../assets/quizData.json'

type Question = {
  [key: string]: { [key: string]: number[] }
}

type Categories = {
  [key: string]: number
}

type Answers = {
  [key: string]: number
}

interface QuizState {
  questions: Question
  categories: Categories
  answers: Answers
}

export const useQuizStore = defineStore('quiz', {
  state: (): QuizState => ({
    questions: quizData.questions,
    categories: quizData.categories,
    answers: {}
  }),
  getters: {
    sumOfAnswers(state): number {
      return Object.keys(state.answers).length;
    },
    totalQuestions(state): number {
      return Object.keys(state.questions).length;
    }
  }
})
