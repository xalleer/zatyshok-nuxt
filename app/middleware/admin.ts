export default defineNuxtRouteMiddleware(async () => {
    const auth = useAuthStore()

    if (!auth.isAuth) {
        await auth.checkAuth()
    }

    if (!auth.isAuth) {
        return navigateTo('/auth/login')
    }

    if (!auth.isAdmin) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden'
        })
    }
})