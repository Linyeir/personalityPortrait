<template>
  <div>
    <h2 class="">{{ $t('questions.' + questionKey) }}</h2>
    <div class="mt-8 flex w-full flex-row justify-center gap-4">
      <button
        @click="selectAnswer(0)"
        class="basis-1/4 items-center rounded-md bg-slate-100 p-2 transition duration-200 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
      >
        {{ $t('texts.answerYes') }}
      </button>
      <button
        @click="selectAnswer(1)"
        class="basis-1/4 items-center rounded-md bg-slate-100 p-2 transition duration-200 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
      >
        {{ $t('texts.answerMaybe') }}
      </button>
      <button
        @click="selectAnswer(2)"
        class="basis-1/4 items-center rounded-md bg-slate-100 p-2 transition duration-200 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-900"
      >
        {{ $t('texts.answerNo') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'QuestionDisplay',
  props: {
    questionKey: {
      type: String,
      required: true
    }
  },
  methods: {
    selectAnswer(answer: number) {
      this.$emit('update', { questionKey: this.questionKey, answer })
    }
  }
})
</script>
