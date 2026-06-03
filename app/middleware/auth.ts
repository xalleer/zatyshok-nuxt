export default defineNuxtRouteMiddleware(async (to) => {
    const auth = useAuthStore()

    if (!auth.isAuth) {
        await auth.checkAuth()
    }

    if (!auth.isAuth) {
        return navigateTo('/auth/login')
    }
})