<template lang="">
  <div
    class="absolute inset-y-0 z-10 flex h-screen w-2/3 flex-col bg-white drop-shadow-lg dark:bg-slate-800 md:w-96 lg:relative lg:w-64 lg:-translate-x-0"
  >
    <h1 class="m-5 text-xl">{{ $t('texts.title') }}</h1>

    <nav class="flex flex-1 flex-col p-2">
      <router-link
        to="/"
        class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
        active-class="bg-slate-100 dark:bg-slate-700"
      >
        <i class="bi bi-house-door-fill px-3"></i>{{ $t('texts.introductionTitle') }}</router-link
      >
      <router-link
        to="/quiz"
        active-class="bg-slate-100 dark:bg-slate-700"
        class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
      >
        <i class="bi bi-chat-left-dots-fill px-3"></i>{{ $t('texts.quizTitle') }}</router-link
      >
      <router-link
        to="/results"
        v-if="allQuestionsAnswered"
        active-class="bg-slate-100 dark:bg-slate-700"
        class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
      >
        <i class="bi bi-bar-chart-fill px-3"></i>{{ $t('texts.resultsTitle') }}</router-link
      >
      <span v-else class="disabled-link my-1 items-center rounded-md p-2 text-gray-500">
        <i class="bi bi-bar-chart-fill px-3"></i>{{ $t('texts.resultsTitle') }}
      </span>
      <button
        @click="themeStore.toggleDarkMode()"
        class="my-1 mt-auto rounded bg-green-500 px-3 py-2 text-left dark:bg-purple-700"
      >
        <i
          class="bi px-2"
          :class="{
            'bi-brightness-low': !themeStore.isDarkMode,
            'bi-moon-stars-fill': themeStore.isDarkMode
          }"
        ></i>
        Toggle {{ themeStore.isDarkMode ? 'Dark' : 'Light' }}-Mode
      </button>

      <div
        class="my-1 rounded-md px-3 py-2 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-900"
      >
        <i class="bi bi-globe px-2"></i>

        <select
          v-model="$i18n.locale"
          class="ml-1 w-3/4 appearance-none bg-transparent"
          aria-label="Select Language"
        >
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
            class="p-3 dark:bg-slate-800 dark:hover:bg-slate-900"
          >
            <span class="">{{ getLanguageName(locale) }}</span>
          </option>
        </select>
      </div>
      <a
        href="https://github.com/Linyeir/personalityPortrait"
        active-class="bg-slate-100 dark:bg-slate-700"
        class="mb-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
        ><i class="bi bi-info-circle px-3"></i>{{ $t('texts.infoTitle') }}</a
      >
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useThemeStore } from '../stores/ThemeStore'
import { useQuizStore } from '../stores/QuizStore'

export default defineComponent({
  components: {},
  setup() {
    const themeStore = useThemeStore()
    const quizStore = useQuizStore()
    const allQuestionsAnswered = quizStore.sumOfAnswers === quizStore.totalQuestions

    function getLanguageName(locale: string): string | undefined {
      const languages = new Map<string, string>([
        ['de', 'Deutsch'],
        ['en', 'English']
      ])
      return languages.get(locale)
    }

    return {
      themeStore,
      getLanguageName,
      allQuestionsAnswered
    }
  }
})
</script>
<style lang=""></style>
