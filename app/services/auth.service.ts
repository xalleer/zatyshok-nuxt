import { api } from "~/utils/api"
import type {SendOtp, User, VerifyOtp} from "~/types/models";
import type {ResponseModel, SendOtpResponse, VerifyOtpResponse} from "~/types/api";

export const authService = {
    sendOtp: (body: SendOtp): Promise<ResponseModel<SendOtpResponse>> => api('auth/send-otp', {
        method: 'POST',
        body
    }),

    verifyOtp: (body: VerifyOtp): Promise<ResponseModel<VerifyOtpResponse>> => api('auth/verify-otp', {
        method: 'POST',
        body
    }),
    checkAuth: (): Promise<ResponseModel<User>> => api('auth/check-auth'),
    logout: () => api('auth/logout', {
        method: 'POST'
    })
}