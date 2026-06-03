import type {Property} from "~/types/models";
import {propertyService} from "~/services/property.service";
import type {PaginationRequest} from "~/types/api";


export const usePropertiesStore = defineStore('properties', () => {
    const toast = useToast()


    const myProperties = ref<Property[]>([])
    const activeProperty = ref<Property | null>(null)

    const loading = ref(false)

    const loadMyProperties = async (meta?: PaginationRequest) => {
        loading.value = true
        try {
            const res = await propertyService.getMyProperties(meta)
            myProperties.value = res.data
        } catch (e) {
            toast.error('Помилка', e.message)
        } finally {
            loading.value = false
        }
    }

    const loadPropertyById = async (id: string) => {
        loading.value = true
        try {
            const res = await propertyService.getPropertyById(id)
            activeProperty.value = res as Property
        } catch (e) {
            toast.error('Помилка', e.message)
        } finally {
            loading.value = false
        }
    }

    const clearActiveProperty = () => {
        activeProperty.value = null
    }

    return {
        myProperties,
        activeProperty,
        loading,
        loadMyProperties,
        loadPropertyById,
        clearActiveProperty
    }
},
    {
        persist: {
            pick: [
                'myProperties',
                'activeProperty'
            ],
            storage: piniaPluginPersistedstate.cookies()
        }
    }
)