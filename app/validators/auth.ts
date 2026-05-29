import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

export const phoneSchema = toTypedSchema(
  z.object({
    phone: z
      .string()
      .min(1, 'Введіть номер телефону')
      .regex(
        /^\+?[0-9\s\-().]{7,15}$/,
        'Невірний формат номера телефону',
      ),
    acceptPolicy: z
      .boolean()
      .refine(val => val === true, {
        message: 'Необхідно прийняти Політику конфіденційності',
      }),
  }),
)


export const otpSchema = toTypedSchema(
  z.object({
    code: z
      .string()
      .length(4, 'Код має містити 4 цифри')
      .regex(/^\d{4}$/, 'Код повинен містити лише цифри'),
  }),
)



export type PhoneFormValues = z.infer<
  ReturnType<typeof phoneSchema['_type'] extends never ? never : any>
>
