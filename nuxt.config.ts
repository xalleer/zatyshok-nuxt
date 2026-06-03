// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    routeRules: {
        '/auth/**': {
            appLayout: 'auth'
        },
        '/admin/**': {
            appLayout: 'admin'
        }
    },
    shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
    notify: {
        position: "top-right",
        duration: 5000,
        maxToasts: 5,
        theme: "dark",
        showIcon: true,
    },
  css: ['~/assets/css/tailwind.css'],
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vee-validate/nuxt',
    'nuxt-notify',
      'pinia-plugin-persistedstate/nuxt'
  ]
})