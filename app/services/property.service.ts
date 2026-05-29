import type {CreateProperty} from "~/types/models";

export const propertyService = {
    create: (body: CreateProperty) => api('properties', {
        method: 'POST',
        body
    }),
    findBySlug: (slug: string) => api(`properties/slug/${slug}`)
}