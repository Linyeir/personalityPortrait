import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'

import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import de from './locales/de.json'

import { createRouter, createWebHashHistory } from 'vue-router'
import IntroView from './views/IntroView.vue'
import QuizView from './views/QuizView.vue'
import ResultsView from './views/ResultsView.vue'

const i18n = createI18n({
    locale: "de",
    // Must be set to 'false', to use Composition API
    legacy: false,

    // Refer a global scope Composer instance of i18n
    globalInjection: true,
    messages: {
        'en': en,
        'de': de,
    }
}
)
const routes = [
    { path: "/", component: IntroView },
    { path: "/quiz", component: QuizView },
    { path: "/results", component: ResultsView },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
    //linkActiveClass: "bg-slate-100 dark:bg-slate-700"
})

createApp(App).use(i18n).use(router).mount('#app')
