<template lang="">
    <div>
        Resultsview
        {{this.answers}}
    </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router';

export default defineComponent({
  // type inference enabled
  props: ['answers'],
  methods: {
    calculateResults() {
      // Use this.answers to calculate and display the quiz results
    }
  },
  created() {
    this.calculateResults();
  },
  data() {return{}},
  mounted() {},
  setup() {
    const route = useRoute();
    const answers = ref(JSON.parse(route.params.answers as string));
  }
})
</script>
<style lang="">
    
</style>