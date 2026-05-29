import { api } from "~/utils/api"
import type {SendOtp} from "~/types/models";
import type {ResponseModel, SendOtpResponse} from "~/types/api";

export const authService = {
    sendOtp: (body: SendOtp): Promise<ResponseModel<SendOtpResponse>> => api('auth/send-otp', {
        method: 'POST',
        body
    })
}