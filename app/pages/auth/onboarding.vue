<script setup lang="ts">
import {useIsMobile} from '~/utils/useIsMobile';


const {isMobile} = useIsMobile()

const currentStep = ref(1)
const totalSteps = 3

const formData = reactive({
  phone: '',
  code: '',
  name: '',
  email: '',
})

const progress = computed(() => (currentStep.value / totalSteps) * 100)

const stepMeta = computed(() => ({
  1: { title: 'Реєстрація', subtitle: 'Введіть номер телефону' },
  2: { title: 'Підтвердження', subtitle: 'Введіть код з SMS' },
  3: { title: 'Профіль', subtitle: 'Розкажіть про себе' },
}[currentStep.value] ?? { title: '', subtitle: '' }))

function onPhoneNext(phone: string) {
  formData.phone = phone
  currentStep.value = 2
}

function onOtpNext(code: string) {
  formData.code = code
  currentStep.value = 3
}

async function onProfileSubmit(values: { name: string; email?: string }) {
  formData.name = values.name
  formData.email = values.email ?? ''
  console.log('Реєстрація завершена:', formData)
  await navigateTo('/')
}

function goBack() {
  if (currentStep.value > 1) currentStep.value--
}
</script>

<template>
  <template v-if="isMobile">
    <div class="fixed inset-0 -z-10">
      <img
        src="~/assets/images/auth-background.png"
        alt=""
        class="w-full h-full object-cover"
      >
      <div class="absolute inset-0 bg-black/40" />
    </div>

    <Sheet :open="true" :modal="false" @update:open="() => {}" @close="goBack">
      <SheetContent
        side="bottom"
        class="rounded-t-3xl px-6 pt-5 pb-10 h-auto max-h-[88svh] overflow-y-auto border-0 shadow-2xl"

      >
        <div class="mx-auto mb-5 w-10 h-1 rounded-full bg-muted-foreground/25" />

        <Progress :model-value="progress" class="mb-5" />

        <SheetHeader class="p-0 mb-1 text-left">
          <SheetTitle class="text-2xl font-bold">{{ stepMeta.title }}</SheetTitle>
          <SheetDescription>{{ stepMeta.subtitle }}</SheetDescription>
        </SheetHeader>

        <AuthOnboardingStepPhone
          v-if="currentStep === 1"
          @next="onPhoneNext"
        />
        <AuthOnboardingStepOtp
          v-else-if="currentStep === 2"
          :phone="formData.phone"
          @next="onOtpNext"
          @back="goBack"
        />
      </SheetContent>
    </Sheet>
  </template>

  <template v-else>
    <Progress :model-value="progress" class="mb-6" />

    <section class="mb-8">
      <h2 class="text-3xl font-bold">{{ stepMeta.title }}</h2>
      <p class="text-muted-foreground mt-1">{{ stepMeta.subtitle }}</p>
    </section>

    <AuthOnboardingStepPhone
      v-if="currentStep === 1"
      @next="onPhoneNext"
    />
    <AuthOnboardingStepOtp
      v-else-if="currentStep === 2"
      :phone="formData.phone"
      @next="onOtpNext"
      @back="goBack"
    />
  </template>
</template>
