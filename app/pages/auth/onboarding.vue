<script setup lang="ts">

const currentStep = ref(1)
const totalSteps = 3

// Дані, що накопичуються між кроками
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

// ── Обробники подій від дочірніх кроків ─────────────────────────────────────

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

  // TODO: виклик API реєстрації
  console.log('Реєстрація завершена:', formData)
  await navigateTo('/')
}

function goBack() {
  if (currentStep.value > 1) currentStep.value--
}

// ── Контроль Sheet (тільки для мобільних) ────────────────────────────────────
// Sheet відкривається одразу при завантаженні сторінки на мобілці
const sheetOpen = ref(true)
</script>

<template>
  <!--
    DESKTOP: стандартний layout з auth.vue (2 колонки)
    MOBILE:  фонове зображення + Sheet знизу

    Ключ: на мобілці ховаємо десктопний контент і показуємо Sheet.
    На десктопі — навпаки.
  -->

  <!-- ── Мобільний варіант (< md) ─────────────────────────────────────────── -->
  <div class="md:hidden">
    <!-- Фон на весь екран -->
    <div class="fixed inset-0 -z-10">
      <img
        src="~/assets/images/auth-background.png"
        alt=""
        class="w-full h-full object-cover"
      >
      <!-- Легкий оверлей для читабельності -->
      <div class="absolute inset-0 bg-black/30" />
    </div>

    <!-- Логотип поверх фото -->
    <header class="flex items-center justify-center pt-12 pb-6">
      <h1 class="text-white text-2xl font-bold tracking-tight">Zatyshok</h1>
    </header>

    <!-- Sheet — "картка" знизу, яка не закривається -->
    <Sheet :open="sheetOpen" @update:open="sheetOpen = $event">
      <SheetContent
        side="bottom"
        class="rounded-t-3xl px-6 pt-6 pb-10 h-auto max-h-[88svh] overflow-y-auto"
        :show-close-button="false"
      >
        <!-- "Ручка" для Sheet -->
        <div class="mx-auto mb-4 w-10 h-1 rounded-full bg-muted-foreground/30" />

        <!-- Прогрес бар -->
        <Progress :model-value="progress" class="mb-6" />

        <!-- Заголовок кроку -->
        <SheetHeader class="p-0 mb-2">
          <SheetTitle class="text-2xl font-bold">{{ stepMeta.title }}</SheetTitle>
          <SheetDescription>{{ stepMeta.subtitle }}</SheetDescription>
        </SheetHeader>

        <!-- Компоненти кроків -->
        <StepPhone v-if="currentStep === 1" @next="onPhoneNext" />
        <StepOtp v-else-if="currentStep === 2" :phone="formData.phone" @next="onOtpNext" @back="goBack" />
      </SheetContent>
    </Sheet>
  </div>

  <!-- ── Десктопний варіант (>= md) ───────────────────────────────────────── -->
  <!--
    auth layout вже робить split (2 колонки).
    Цей slot рендериться в ліву колонку layout-у.
    Тому тут просто контент без додаткових оберток.
  -->
  <div class="hidden md:block">
    <!-- Прогрес бар -->
    <Progress :model-value="progress" class="mb-6" />

    <!-- Заголовок -->
    <section class="flex flex-col gap-1">
      <h2 class="text-3xl font-bold">{{ stepMeta.title }}</h2>
      <p class="text-muted-foreground">{{ stepMeta.subtitle }}</p>
    </section>

    <!-- Кроки -->
    <StepPhone v-if="currentStep === 1" @next="onPhoneNext" />
    <StepOtp v-else-if="currentStep === 2" :phone="formData.phone" @next="onOtpNext" @back="goBack" />
  </div>
</template>
