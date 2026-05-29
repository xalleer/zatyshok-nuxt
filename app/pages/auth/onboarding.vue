<script setup lang="ts">
import {useIsMobile} from '~/utils/useIsMobile';
import {authService} from "~/services/auth.service";
import type {CreateProperty, UserRole} from "~/types/models";
import {propertyService} from "~/services/property.service";

const {isMobile} = useIsMobile()
const toast = useToast();

const otpStepRef = ref<InstanceType<typeof import('~/components/auth/onboarding/step-otp.vue')>>()

const currentStep = ref(1)
const totalSteps = 3

const formData = reactive({
  phone: '',
  code: '',
})

const progress = computed(() => (currentStep.value / totalSteps) * 100)

const stepMeta = computed(() => ({
  1: { title: 'Реєстрація', subtitle: 'Введіть номер телефону' },
  2: { title: 'Підтвердження', subtitle: 'Введіть код з SMS' },
  3: { title: 'Ваш об`єкт', subtitle: "Створіть об'єкт та перейдемо до налаштувань"  },
}[currentStep.value] ?? { title: '', subtitle: '' }))

async function onPhoneNext(phone: string) {
  formData.phone = phone

  try {
    const res = await authService.sendOtp({
      phone: phone
    })

    if (res) {
      currentStep.value = 2
      toast.success("Відправлено!", "Код для підтвердження відправлено на номер " + phone);
    }

  } catch (e) {
    toast.error("Помилка", e.message);
  }
}

async function onOtpNext(code: string) {
  formData.code = code
  try {
    await authService.verifyOtp({
      phone: formData.phone,
      code: code,
      // role: 'HOST' as UserRole,
    })

    currentStep.value = 3

  } catch (e) {
    toast.error("Помилка", e.message);
  }
}

async function onResendOtp() {
  try {
    const res = await authService.sendOtp({
      phone: formData.phone
    })

    if (res) {
      toast.success("Відправлено!", "Новий код відправлено на номер " + formData.phone);
      otpStepRef.value?.resetTimer()
    }

  } catch (e) {
    toast.error("Помилка", e.message);
  }
}

async function onCreateProperty(data: CreateProperty) {
  try {
    await propertyService.create(data)
    await navigateTo(`/admin/${data.slug}/setting`)

  } catch (e) {
    toast.error("Помилка", e.message);
  }
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
          @send-otp="onPhoneNext"
          @next="onPhoneNext"
        />
        <AuthOnboardingStepOtp
          ref="otpStepRef"
          v-else-if="currentStep === 2"
          :phone="formData.phone"
          @next="onOtpNext"
          @back="goBack"
          @send-otp="onResendOtp"
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
      @send-otp="onPhoneNext"
      @next="onPhoneNext"
    />
    <AuthOnboardingStepOtp
      ref="otpStepRef"
      v-else-if="currentStep === 2"
      :phone="formData.phone"
      @next="onOtpNext"
      @back="goBack"
      @send-otp="onResendOtp"
    />

    <AuthOnboardingStepProperty v-else-if="currentStep === 3" @next="onCreateProperty" @back="goBack"/>
  </template>
</template>
