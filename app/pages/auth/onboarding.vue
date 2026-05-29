<script setup lang="ts">

</script>

<template>
  <Form>
    <FormField v-slot="{ componentField }" name="username">
      <FormLabel>Phone</FormLabel>
      <FormControl>
        <Input type="tel" placeholder="+380 000 00 00" v-bind="componentField" />
      </FormControl>
    </FormField>
  </Form>
</template>

<style scoped>

</style>