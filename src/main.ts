import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import en from './locales/en.json'
import de from './locales/de.json'
import IntroView from './views/IntroView.vue'
import QuizView from './views/QuizView.vue'
import ResultsView from './views/ResultsView.vue'
import './assets/main.css'

const i18n = createI18n({
  locale: 'de',
  // Must be set to 'false', to use Composition API
  legacy: false,

  // Refer a global scope Composer instance of i18n
  globalInjection: true,
  messages: {
    en: en,
    de: de
  }
})
const routes = [
  { path: '/', component: IntroView },
  { path: '/quiz', component: QuizView },
  { path: '/results', component: ResultsView, props: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

const pinia = createPinia()

createApp(App).use(i18n).use(router).use(pinia).mount('#app')
