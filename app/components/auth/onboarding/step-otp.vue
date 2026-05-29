<script setup lang="ts">
import { useForm } from 'vee-validate'
import { otpSchema } from '~/validators/auth'

const toast = useToast();

const timer = ref(60)
let intervalId: ReturnType<typeof setInterval> | null = null

const props = defineProps<{
  phone: string
}>()

const emit = defineEmits<{
  next: [code: string]
  back: [],
  sendOtp: [],
}>()

function startTimer() {
  if (intervalId) {
    clearInterval(intervalId)
  }
  timer.value = 60
  intervalId = setInterval(() => {
    timer.value--
    if (timer.value === 0) {
      clearInterval(intervalId!)
      intervalId = null
    }
  }, 1000)
}

function resetTimer() {
  startTimer()
}

defineExpose({
  resetTimer
})

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

onMounted(() => {
  startTimer()
})
</script>

<template>
  <form class="flex flex-col gap-5 mt-6" @submit.prevent="onSubmit">

    <p class="text-sm text-muted-foreground">
      Ми надіслали код на
      <span class="font-medium text-foreground">{{ phone }}</span>
    </p>

    <FormField class="flex-1 w-full" v-slot="{ field }" name="code">
      <FormItem class="flex-1 w-full">
        <FormLabel>Код підтвердження</FormLabel>
        <FormControl>
          <InputOTP class="w-full" :maxlength="4" @complete="onOtpComplete">
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

      <div v-if="timer > 0" class="text-sm text-muted-foreground">
        Повторно відправити через {{ timer }} секунд
      </div>

      <div v-else>
        <Button type="button" variant="ghost" @click="emit('sendOtp')">
          Надіслати код
        </Button>
      </div>
    </FormField>

    <div class="flex gap-3">
      <Button size="lg" type="button" variant="outline" @click="emit('back')">
        Назад
      </Button>
      <Button type="submit" size="lg" class="flex-1" :disabled="isSubmitting">
        Підтвердити
      </Button>
    </div>

  </form>
</template>
