<script setup lang="ts">

</script>

<template>
  <div class="min-h-screen flex">

    <div class="w-1/2">
      <header class="flex items-center justify-center border-b-2 border-gray-200 py-4">
        <h1>Zatyshok</h1>
      </header>
      <main>
        <h2>Реєстрація</h2>
        <p>Заповніть форму для реєстрації</p>
        <slot />
      </main>
    </div>
    <div class="w-1/2 h-screen overflow-hidden">
      <img src="../assets/images/auth-background.png" alt="Background" class="w-full h-full object-cover">
    </div>
  </div>
</template>

<style scoped>

</style>