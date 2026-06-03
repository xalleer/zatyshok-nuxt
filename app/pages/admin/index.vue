<script setup lang="ts">
const propertiesStore = usePropertiesStore()

onBeforeMount(async () => {
  await propertiesStore.loadMyProperties()

  if (propertiesStore.myProperties.length > 0 && propertiesStore.myProperties[0])
    await propertiesStore.loadPropertyById(propertiesStore.myProperties[0].id)
    navigateTo(`/admin/${propertiesStore.myProperties[0]?.slug}`)
})
</script>

<template>
Main admin pages
</template>

<style scoped>

</style>