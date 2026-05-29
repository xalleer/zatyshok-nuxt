<script setup lang="ts">
import { useForm } from 'vee-validate'
import { otpSchema } from '~/validators/auth'

const props = defineProps<{
  phone: string
}>()

const emit = defineEmits<{
  next: [code: string]
  back: []
}>()

const { handleSubmit, isSubmitting, setFieldValue } = useForm({
  validationSchema: otpSchema,
  initialValues: { code: '' },
})

const onSubmit = handleSubmit((values) => {
  emit('next', values.code)
})

function onOtpComplete(value: string) {
  setFieldValue('code', value)
}
</script>

<template>
  <form class="flex flex-col gap-6 mt-8" @submit.prevent="onSubmit">

    <p class="text-sm text-muted-foreground">
      Ми надіслали код підтвердження на номер
      <span class="font-medium text-foreground">{{ phone }}</span>
    </p>

    <FormField v-slot="{ field }" name="code">
      <FormItem>
        <FormLabel>Код підтвердження</FormLabel>
        <FormControl>
          <InputOTP
            :maxlength="4"
            @complete="onOtpComplete"
          >
            <InputOTPGroup>
              <InputOTPSlot :index="0" />
              <InputOTPSlot :index="1" />
              <InputOTPSlot :index="2" />
              <InputOTPSlot :index="3" />
            </InputOTPGroup>
          </InputOTP>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <div class="flex gap-3">
      <Button
        type="button"
        variant="outline"
        class="flex-none"
        @click="emit('back')"
      >
        Назад
      </Button>
      <Button type="submit" size="lg" class="flex-1" :disabled="isSubmitting">
        Підтвердити
      </Button>
    </div>

  </form>
</template>
