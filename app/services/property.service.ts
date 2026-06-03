import type {CreateProperty, Property, UpdateProperty} from "~/types/models";
import type {PaginationRequest, PaginationResponse, ResponseModel} from "~/types/api";

export const propertyService = {
    create: (body: CreateProperty) => api('properties', {
        method: 'POST',
        body
    }),
    findBySlug: (slug: string) => api(`properties/slug/${slug}`),
    getMyProperties: (
        meta?: PaginationRequest
    ): Promise<PaginationResponse<Property>> => {
        const query = new URLSearchParams()

        if (meta?.page) query.append('page', String(meta.page))
        if (meta?.limit) query.append('limit', String(meta.limit))

        return api<PaginationResponse<Property>>(
            `properties/my${query.toString() ? `?${query.toString()}` : ''}`
        )
    },
    getPropertyById: (id: string): Promise<ResponseModel<Property>> => api(`properties/${id}`),
    updatePropertyById: (id: string, body: UpdateProperty): Promise<ResponseModel<Property>> => api(`properties/${id}`, {
        method: 'PATCH',
        body
    }),
    deletePropertyById: (id: string) => api(`properties/${id}`, {
        method: 'DELETE'
    }),
    getPublicPropertyBySlug: (slug: string): Promise<ResponseModel<Property>> => api(`properties/slug/${slug}`),
    getPublicAllProperties: (meta?: PaginationRequest): Promise<PaginationResponse<Property>> => {
        const query = new URLSearchParams()

        if (meta?.page) query.append('page', String(meta.page))
        if (meta?.limit) query.append('limit', String(meta.limit))

        return api<PaginationResponse<Property>>(
            `properties/${query.toString() ? `?${query.toString()}` : ''}`
        )
    }
}