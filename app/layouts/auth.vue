<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen flex">

    <div class="w-2/5">
      <header class="flex items-center justify-center border-b-2 border-gray-200 py-4">
        <h1>Zatyshok</h1>
      </header>
      <main class="px-24 py-12">


        <slot />
      </main>
    </div>
    <div class="w-3/5 h-screen overflow-hidden">
      <img src="../assets/images/auth-background.png" alt="Background" class="w-full h-full object-cover">
    </div>
  </div>
</template>

<style scoped>

</style>
