<script setup lang="ts">
import {InputOTP} from "~/components/ui/input-otp";

const currentStep = ref(1)
const totalSteps = 3

const progress = computed(() => (currentStep.value / totalSteps) * 100)

const stepInfo = computed(() => {
  switch (currentStep.value) {
    case 1: return { title: 'Реєстрація', subtitle: 'Заповніть форму для реєстрації' }
    case 2: return { title: 'Підтвердження', subtitle: 'Введіть код з SMS' }
    case 3: return { title: 'Профіль', subtitle: 'Розкажіть про себе' }
    default: return { title: '', subtitle: '' }
  }
})

const nextStep = () => {
  if (currentStep.value < totalSteps) currentStep.value++
}

const prevStep = () => {
  if (currentStep.value > 1) currentStep.value--
}
</script>

<template>
  <Progress :model-value="progress" />

  <section class="flex flex-col gap-4 mt-4">
    <h2 class="text-4xl font-bold">{{ stepInfo.title }}</h2>
    <p class="text-gray-500">{{ stepInfo.subtitle }}</p>
  </section>

  <Form v-if="currentStep === 1" class="mt-12 ">
    <FormField v-slot="{ componentField }" name="username">
      <FormLabel class="text-gray-500">Phone</FormLabel>
      <FormControl class="mt-4">
        <Input  type="tel" placeholder="+380 000 00 00" v-bind="componentField" />
      </FormControl>
    </FormField>

    <div class="flex items-start gap-2 mt-4">
      <Checkbox />
      <div class="grid gap-2">
        <Label>Я погоджуюсь з <span>Політикою конфіденційності</span></Label>
        <p class="text-muted-foreground text-sm">Натискаючи цю кнопку, ви підтверджуєте свою згоду з Політикою конфіденційності</p>
      </div>
    </div>
    <Button @click.prevent="nextStep" size="lg" class="mt-4 w-full" type="button">Далі</Button>

    <div class="flex items-center flex-col mt-4">
      <Label class="text-gray-500">У вас є аккаунт?</Label>
      <Button variant="link">Увійти</Button>
    </div>
  </Form>

  <Form v-else-if="currentStep === 2" class="mt-12">
    <FormField name="code" >
      <FormLabel class="text-gray-500">Код підтвердження</FormLabel>
      <FormControl class="mt-4">
        <InputOTP :maxlength="4">
          <InputOTPGroup>
            <InputOTPSlot :index="0" />
            <InputOTPSlot :index="1" />
            <InputOTPSlot :index="2" />
            <InputOTPSlot :index="3" />
          </InputOTPGroup>
        </InputOTP>
      </FormControl>
    </FormField>
    <div class="flex gap-2 mt-4">
      <Button variant="outline" @click.prevent="prevStep">Назад</Button>
      <Button @click.prevent="nextStep" size="lg" class="flex-1">Далі</Button>
    </div>
  </Form>


</template>

<style scoped>

</style>
