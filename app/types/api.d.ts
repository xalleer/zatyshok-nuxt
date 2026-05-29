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