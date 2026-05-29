<script setup lang="ts">
import { useForm } from 'vee-validate'
import { phoneSchema } from '~/validators/auth'

const emit = defineEmits<{
  next: [phone: string]
}>()

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: phoneSchema,
  initialValues: {
    phone: '',
    acceptPolicy: false,
  },
})

const onSubmit = handleSubmit((values) => {
  emit('next', values.phone)
})
</script>

<template>
  <form class="flex flex-col gap-5 mt-6" @submit.prevent="onSubmit">

    <FormField v-slot="{ componentField }" name="phone">
      <FormItem>
        <FormLabel>Номер телефону</FormLabel>
        <FormControl>
          <Input
            type="tel"
            placeholder="+380 99 123 45 67"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" name="acceptPolicy" type="checkbox">
      <FormItem class="flex flex-row items-start gap-3 space-y-0">
        <FormControl>
          <Checkbox
            :modelValue="value"
            @update:modelValue="handleChange"
          />
        </FormControl>
        <div class="flex flex-col gap-1">
          <FormLabel class="cursor-pointer font-normal leading-snug">
            Я погоджуюсь з
            <NuxtLink to="/privacy" class="text-primary underline underline-offset-2 font-medium">
              Політикою конфіденційності
            </NuxtLink>
          </FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <Button type="submit" size="lg" class="w-full" :disabled="isSubmitting">
      Далі
    </Button>

    <p class="text-center text-sm text-muted-foreground">
      Вже є акаунт?
      <NuxtLink to="/auth/login" class="text-primary font-medium hover:underline">
        Увійти
      </NuxtLink>
    </p>

  </form>
</template>
