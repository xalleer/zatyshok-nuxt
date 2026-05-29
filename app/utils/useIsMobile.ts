/**
 * Composable для визначення мобільного брейкпоінту.
 * SSR-safe: на сервері завжди повертає false (десктоп),
 * після гідрації оновлюється до реального значення.
 *
 * Tailwind md = 768px
 */
export function useIsMobile() {
  const isMobile = ref(false)

  onMounted(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    isMobile.value = mq.matches

    const handler = (e: MediaQueryListEvent) => {
      isMobile.value = e.matches
    }

    mq.addEventListener('change', handler)
    onUnmounted(() => mq.removeEventListener('change', handler))
  })

  return { isMobile }
}
