<script lang="ts">
import { onMounted, onUnmounted, computed, ref, defineComponent, watch } from 'vue'
import sidebarMenu from './components/SidebarMenu.vue'
import { useThemeStore } from './stores/ThemeStore'
import { useRoute } from 'vue-router'

import 'bootstrap-icons/font/bootstrap-icons.css'

export default defineComponent({
  components: {
    sidebarMenu
  },
  setup() {
    const screenWidth = ref(window.innerWidth)
    const isLargeScreen = computed(() => screenWidth.value >= 1024)
    const showSidebar = ref(isLargeScreen.value)

    const themeStore = useThemeStore()
    themeStore.initializeDarkMode()

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    function handleResize() {
      screenWidth.value = window.innerWidth

      showSidebar.value = isLargeScreen.value
    }

    function toggleSidebar() {
      showSidebar.value = !showSidebar.value
    }
    const route = useRoute()

    // Close the sidebar on route change
    watch(route, () => {
      if (!isLargeScreen.value) {
        showSidebar.value = false
      }
    })

    return {
      showSidebar,
      isLargeScreen,
      toggleSidebar
    }
  }
})
</script>

<template>
  <div class="relative flex min-h-screen bg-slate-50 dark:bg-slate-700 dark:text-white">
    <div
      v-if="showSidebar && !isLargeScreen"
      @click="toggleSidebar"
      class="fixed z-10 h-full w-full bg-gray-400 opacity-50"
    ></div>
    <Transition name="slide-fade">
      <sidebarMenu v-if="showSidebar" />
    </Transition>

    <div class="flex-column h-full flex-1">
      <header class="my-2 flex border-b-4 p-2" v-if="!isLargeScreen">
        <h1 class="inline text-xl">{{ $t('texts.title') }}</h1>
        <button @click="toggleSidebar()" class="ml-auto">
          <i
            class="bi px-3 text-xl"
            :class="{ 'bi-x-lg': showSidebar, 'bi-list': !showSidebar }"
          ></i>
        </button>
      </header>

      <router-view class=""></router-view>
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
