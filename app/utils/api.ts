import type {ResponseException} from "~/types/api";

export const api = $fetch.create({
    baseURL: 'http://localhost:3000/api/',
    credentials: 'include',
    onResponseError({ response }) {
        const error = response._data as ResponseException

        if (error.statusCode === 401) navigateTo('/login')
        if (error.statusCode === 403) navigateTo('/forbidden')

        throw error
    }
})
