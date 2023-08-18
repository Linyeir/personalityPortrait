<template lang="">
  <div class="algin center flex h-screen flex-col items-center justify-center">
    <div
      id="results"
      ref="appRef"
      class="mx-5 w-5/6 max-w-4xl overflow-hidden rounded-xl bg-white p-14 shadow-lg dark:bg-slate-800"
    >
      <div v-if="hashValue">
        <h2 class="text-lg">{{ $t('texts.shareHeading') }}</h2>
        <div v-if="isHashCorrect">
          <personality-results :scores="decompressedHashScores" />
        </div>
        <div v-else>
          {{ $t('texts.shareError') }}
          <router-link
            to="/"
            class="my-1 items-center rounded-md p-2 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-900"
            active-class="bg-slate-100 dark:bg-slate-700"
          >
            <i class="bi bi-arrow-right px-3"></i>{{ $t('texts.shareCTA') }}</router-link
          >
        </div>
      </div>

      <div v-else>
        <h2 class="mb-4 text-lg">{{ $t('texts.resultsHeading') }}</h2>
        <personality-results />
        <div class="w-100 mt-8 flex h-8 justify-end" v-show="!screenshotMode">
          <div v-if="isSupported">
            <button
              @click="copyHash()"
              class="mx-1 rounded-md bg-slate-100 px-3 py-2 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
            >
              <i class="bi bi-link px-1"></i>
              {{ $t('texts.shareButton') }}
            </button>
            <Transition>
              <p
                class="me-2 mt-2 text-end text-xs text-green-500 transition dark:text-purple-700"
                v-if="copied"
              >
                {{ $t('texts.shareSuccessful') }}
              </p>
            </Transition>
          </div>
          <button
            @click="saveImage()"
            class="mx-1 self-start rounded-md bg-slate-100 px-3 py-2 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
          >
            <i class="bi bi-download px-1"></i>
            {{ $t('texts.downloadButton') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useClipboard, usePermission } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { useQuizStore } from '../stores/QuizStore'
import PersonalityResults from '../components/PersonalityResults.vue'
import { domToPng } from 'modern-screenshot'

type Scores = {
  [key: string]: number
}

function compress(answers: Scores): string {
  const base18String = Object.values(answers)
    .map((val) => val.toString(18))
    .join('')

  return base18String
}

function decompress(str: string, categories: Scores): Scores {
  let scores: Scores = {}
  let strArray = str.split('').map((val) => parseInt(val, 18))

  for (const key in categories) {
    scores[key] = strArray.shift() || 0
  }

  return scores
}

export default defineComponent({
  components: {
    PersonalityResults
  },

  setup() {
    const route = useRoute()
    const hashValue = route.params.hash as string
    let isHashCorrect = /^[0-9a-h]{14}$/.test(hashValue)
    const quizStore = useQuizStore()
    const scores = computed(() => quizStore.scores)

    const decompressedHashScores = decompress(hashValue, quizStore.categories)

    const { isSupported, copy, copied } = useClipboard()

    function copyHash() {
      usePermission('clipboard-write')
      copy('https://linyeir.github.com/personalityPortrait/#/results/' + compress(quizStore.scores))
    }

    const appRef = ref(null)
    const screenshotMode = ref(false)
    async function saveImage() {
      screenshotMode.value = true
      await nextTick()
      await new Promise((resolve) => setTimeout(resolve, 100))
      if (appRef.value) {
        console.log('if')
        domToPng(appRef.value).then((dataUrl) => {
          const link = document.createElement('a')
          link.download = 'personalityPortrait.png'
          link.href = dataUrl
          link.click()
        })
        await nextTick()
        await new Promise((resolve) => setTimeout(resolve, 100))
        screenshotMode.value = false
      } else {
        screenshotMode.value = false
      }
    }

    return {
      scores,
      hashValue,
      isHashCorrect,
      copyHash,
      appRef,
      screenshotMode,
      saveImage,
      isSupported,
      decompressedHashScores,
      copied
    }
  }
})
</script>
<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
