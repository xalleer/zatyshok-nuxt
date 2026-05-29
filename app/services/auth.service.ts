import { api } from "~/utils/api"
import type {SendOtp, VerifyOtp} from "~/types/models";
import type {ResponseModel, SendOtpResponse, VerifyOtpResponse} from "~/types/api";

export const authService = {
    sendOtp: (body: SendOtp): Promise<ResponseModel<SendOtpResponse>> => api('auth/send-otp', {
        method: 'POST',
        body
    }),

    verifyOtp: (body: VerifyOtp): Promise<ResponseModel<VerifyOtpResponse>> => api('auth/verify-otp', {
        method: 'POST',
        body
    })
}