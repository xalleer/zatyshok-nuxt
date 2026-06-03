<script setup lang="ts">
const propertiesStore = usePropertiesStore()

onMounted(() => {
  console.log(propertiesStore.activeProperty)
})

</script>

<template>
  <section>
    {{ propertiesStore.activeProperty }}
  </section>
</template>

<style scoped>

</style>