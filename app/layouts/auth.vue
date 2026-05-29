<script setup lang="ts">
// Десктопний layout: ліворуч форма, праворуч фото
// На мобілці цей layout не рендериться для /auth/* — сторінка сама керує Sheet
</script>

<template>
  <div class="min-h-screen flex">

    <!-- Ліва колонка — форма -->
    <div class="w-full md:w-2/5 md:flex md:flex-col">
      <header class="flex items-center justify-center border-b border-border py-4 px-6">
        <NuxtLink to="/" class="text-xl font-bold tracking-tight">
          Zatyshok
        </NuxtLink>
      </header>
      <main class="flex-1 px-6 py-10 md:px-16 lg:px-24 md:py-12">
        <slot />
      </main>
    </div>

    <!-- Права колонка — фото (тільки на десктопі) -->
    <div class="hidden md:block md:w-3/5 h-screen sticky top-0">
      <img
        src="~/assets/images/auth-background.png"
        alt=""
        class="w-full h-full object-cover"
      >
    </div>

  </div>
</template>
