import { z } from 'zod'
import inputFieldSchema, {
  emailSchema,
  passwordSchema,
  phoneNumberSchema,
  userNameSchema,
  uuidSchema,
} from '../inputFieldSchema.js'
import { BloodGroupEnum, GenderEnum } from '@prisma/client'

const personalDetailsRequestSchema = z.object({
  // username: userNameSchema,
  // password: passwordSchema.optional(),
  // confirmPassword: passwordSchema.optional(),
  firstName: inputFieldSchema,
  lastName: inputFieldSchema,
  divyangId: inputFieldSchema,
  picture: inputFieldSchema.optional(),
  bloodGroup: z.nativeEnum(BloodGroupEnum),
  gender: z.nativeEnum(GenderEnum), // is optional in sheet
  dateOfBirth: z.string().datetime(),
  age: z.number().optional(),
  mailId: emailSchema,
  mobileNumber: phoneNumberSchema,
  fatherName: inputFieldSchema,
  motherName: inputFieldSchema,
  isMarried: z.boolean().optional(),
  spouseName: inputFieldSchema.optional(),
  spouseNumber: phoneNumberSchema.optional(),
  religion: inputFieldSchema,
  communityCategoryId: uuidSchema,
  community: inputFieldSchema,
  extraCurricularActivity: inputFieldSchema.optional(),
})

const divyangSignUpRequestSchema = z
  .object({
    username: userNameSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema,
    firstName: inputFieldSchema,
    lastName: inputFieldSchema,
    divyangId: inputFieldSchema,
    picture: inputFieldSchema.optional(),
    gender: z.nativeEnum(GenderEnum), // is optional in sheet
    dateOfBirth: z.string().datetime(),
    age: z.number().optional(),
    mailId: emailSchema,
    mobileNumber: phoneNumberSchema,
    aadharCardNumber: z
      .string()
      .length(12)
      .regex(/^\d{12}$/, 'Invalid Aadhaar number format'),
    UDIDCardNumber: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

type PersonalDetails = z.infer<typeof personalDetailsRequestSchema>
type DivyangSignUp = z.infer<typeof divyangSignUpRequestSchema>

export {
  personalDetailsRequestSchema,
  PersonalDetails,
  divyangSignUpRequestSchema,
  DivyangSignUp,
}
