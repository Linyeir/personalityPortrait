<template lang="">
  <div
    class="absolute inset-y-0 flex w-2/3 flex-col bg-white drop-shadow-lg dark:bg-slate-800 md:w-96 lg:relative lg:w-64 lg:-translate-x-0"
  >
    <h1 class="m-5 text-xl">{{ $t('title') }}</h1>

    <nav class="flex flex-1 flex-col p-2">
      <router-link
        to="/"
        class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
        active-class="bg-slate-100 dark:bg-slate-700"
      >
        <i class="bi bi-house-door-fill px-3"></i>{{ $t('introductionTitle') }}</router-link
      >
      <router-link
        to="/quiz"
        active-class="bg-slate-100 dark:bg-slate-700"
        class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
      >
        <i class="bi bi-chat-left-dots-fill px-3"></i>{{ $t('quizTitle') }}</router-link
      >
      <router-link
        to="/results"
        active-class="bg-slate-100 dark:bg-slate-700"
        class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
      >
        <i class="bi bi-bar-chart-fill px-3"></i>{{ $t('resultsTitle') }}</router-link
      >
      <button
        @click="toggleDark()"
        class="mt-auto rounded bg-green-500 p-2 text-left dark:bg-purple-700"
      >
        <i
          class="bi px-3"
          :class="{ 'bi-brightness-low': !isDark, 'bi-moon-stars-fill': isDark }"
        ></i>
        Toggle {{ isDark ? 'Dark' : 'Light' }}-Mode
      </button>
      <select
        v-model="$i18n.locale"
        class="my-2 block w-full appearance-none rounded-md px-5 py-2 pr-8 hover:bg-slate-200 focus:border-sky-500 focus:outline-none focus:ring-sky-500 dark:bg-slate-800 dark:hover:bg-slate-900"
      >
        <option
          v-for="locale in $i18n.availableLocales"
          :key="`locale-${locale}`"
          :value="locale"
          class="bg-white p-3 dark:bg-slate-800 dark:hover:bg-slate-900"
        >
          <span class="mr-4"> {{ getLanguageFlag(locale) }} </span>
          <span class="pl-4">{{ getLanguageName(locale) }}</span>
        </option>
      </select>
      <a
        href="https://github.com/Linyeir/personalityPortrait"
        active-class="bg-slate-100 dark:bg-slate-700"
        class="mb-5 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
        ><i class="bi bi-info-circle px-3"></i>{{ $t('infoTitle') }}</a
      >
    </nav>
  </div>
</template>
<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)

function getLanguageName(locale: string): string | undefined {
  const languages = new Map<string, string>([
    ['de', 'Deutsch'],
    ['en', 'English']
  ])
  return languages.get(locale)
}
function getLanguageFlag(locale: string): string | undefined {
  const languages = new Map<string, string>([
    ['de', '🇩🇪'],
    ['en', '🇬🇧']
  ])
  return languages.get(locale)
}
</script>
<style lang=""></style>
