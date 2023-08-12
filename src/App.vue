<script setup lang="ts">
import sidebarMenu from './components/SidebarMenu.vue'
import { useThemeStore } from './stores/ThemeStore'

import { useToggle } from '@vueuse/core'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { ref } from 'vue'

const isLargeScreen = window.innerWidth >= 1024
const showSidebar = ref(isLargeScreen)
const toggleSidebar = useToggle(showSidebar)

const themeStore = useThemeStore()
themeStore.initializeDarkMode()

</script>

<template>
  <div class="relative flex min-h-screen bg-slate-50 dark:bg-slate-700 dark:text-white">
    <Transition name="slide-fade">
      <sidebarMenu v-if="showSidebar" />
    </Transition>

    <div class="m-6 flex-1">
      <header class="mb-6 flex border-b-4" v-if="!isLargeScreen">
        <h1 class="inline text-xl">{{ $t('title') }}</h1>
        <button @click="toggleSidebar()" class="ml-auto">
          <i
            class="bi px-3 text-xl"
            :class="{ 'bi-x-lg': showSidebar, 'bi-list': !showSidebar }"
          ></i>
        </button>
      </header>

      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
html.dark {
  color-scheme: dark;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: transform 0.3s;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
}
</style>
