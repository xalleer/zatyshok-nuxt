import {authService} from "~/services/auth.service";
import {type User, UserRole} from "~/types/models";

export const useAuthStore = defineStore('auth', () => {
    const toast = useToast()

    const user = ref<User | null>(null)
    const isAuth = ref(false)

    const checkAuth = async () => {
        try {
            const data = await authService.checkAuth()
            user.value = data as User
            isAuth.value = true
        } catch (e) {
            user.value = null
            isAuth.value = false
        }
    }

    const logout = async () => {
        try {
            await authService.logout()
            isAuth.value = false
        } catch (e: any) {
            toast.error('Помилка', e.message)
        }
    }

    const isAdmin = computed(() => user.value?.role === UserRole.HOST)
    return {
        isAuth,
        user,
        isAdmin,
        checkAuth,
        logout
    }
})