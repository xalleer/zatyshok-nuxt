
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import * as z from 'zod'

const phoneValidator = z.object({
  phone: z.string().min(10).max(15),
})
