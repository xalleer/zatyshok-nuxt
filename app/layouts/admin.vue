<script setup lang="ts">

</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main class="flex-1">
      <slot />
    </main>
  </SidebarProvider>
</template>

<style scoped>

</style>