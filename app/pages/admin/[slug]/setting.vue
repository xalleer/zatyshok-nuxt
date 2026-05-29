<script setup lang="ts">
import {propertyService} from '~/services/property.service'

const property = reactive({})

onMounted(async () => {
  const slug = useRoute().params.slug
  property = await propertyService.findBySlug(slug as string)
  console.log(property)
})
</script>

<template>
{{ property }}
</template>

<style scoped>

</style>