<template>
  <main>
    <AppLayout/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppLayout from '@/layouts/AppLayout.vue'

export default defineComponent({
  name: 'App',
  components: {
    AppLayout,
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

