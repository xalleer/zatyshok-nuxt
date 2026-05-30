<script setup lang="ts">
import {useIsMobile} from "~/utils/useIsMobile";
import {authService} from "~/services/auth.service";

const {isMobile} = useIsMobile()
const currentStep = ref(1)
const totalSteps = 2
const toast = useToast();
const otpStepRef = ref<InstanceType<typeof import('~/components/auth/onboarding/step-otp.vue')>>()

const formData = reactive({
  phone: '',
  code: '',
})

const stepMeta = ref({
  title: 'Вхід',
  subtitle: 'Введіть номер телефону',
})

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
  </template>

  <template v-else>
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
  </template>
</template>

<style scoped>

</style>
