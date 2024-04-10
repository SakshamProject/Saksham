import { string, z } from 'zod'
import inputFieldSchema, {
  emailSchema,
  phoneNumberSchema,
  uuidSchema,
} from '../inputFieldSchema.js'
import { BloodGroup, Gender } from '@prisma/client'

const personalDetailsRequestSchema = z.object({
  firstName: inputFieldSchema,
  lastName: inputFieldSchema,
  divyangId: /*uuidSchema*/ inputFieldSchema,
  picture: inputFieldSchema.optional(),
  bloodGroup: z.nativeEnum(BloodGroup),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string().datetime(),
  age: z.number().optional(),
  mailId: emailSchema,
  mobileNumber: phoneNumberSchema,
  fatherName: inputFieldSchema,
  motherName: inputFieldSchema,
  isMarried: z.boolean(),
  spouseName: inputFieldSchema.optional(),
  spouseNumber: phoneNumberSchema.optional(),
  religion: inputFieldSchema,
  communityCategoryId: /*uuidSchema*/ inputFieldSchema,
  community: inputFieldSchema,
  extraCurricularActivity: inputFieldSchema.optional(),
})

export { personalDetailsRequestSchema }
