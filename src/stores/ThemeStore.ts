import { defineStore } from 'pinia'
import { watch } from 'vue'
import { useDark } from '@vueuse/core'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDarkMode: false
  }),
  // Getters
  getters: {
    getDarkModePreference(state) {
      return state.isDarkMode
    }
  },

  // Actions
  actions: {
    initializeDarkMode() {
      const dark = useDark()
      this.isDarkMode = dark.value

      // Update store when dark mode value changes
      watch(dark, (newValue) => {
        this.isDarkMode = newValue
      })

      // Sync store changes to the useDark function
      watch(
        () => this.isDarkMode,
        (newValue) => {
          dark.value = newValue
        }
      )
    },

    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
    }
  },
  persist: true
})
