import type {User} from "~/types/models";

export interface ResponseException {
    error: string
    message: string []
    statusCode: number
}
export type ResponseModel<T> = T | ResponseException

export interface SendOtpResponse {
    expiresIn: string
    message: string
}

export interface VerifyOtpResponse {
    user: User
    message: string
}

export interface PaginationResponse<T> {
    data: T []
    meta: {
        total: number
        page: number
        limit: number
        totalPages: number
        hasNext: boolean
        hasPrevious: boolean
    }
}

export interface PaginationRequest {
    page?: number
    limit?: number
}
