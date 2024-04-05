import { string, z } from 'zod'
import inputFieldSchema, { phoneNumberSchema, uuidSchema } from '../../inputFieldSchema.js'
import { BloodGroup, Gender, Prisma } from '@prisma/client'

const personalDetailsRequestSchema = z.object({
  firstName: inputFieldSchema,
  lastName: inputFieldSchema,
  divyangId: uuidSchema,
  picture: inputFieldSchema.optional(),
  bloodGroup: z.nativeEnum(BloodGroup),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.date(),
  age: z.number().optional(),
  mailId: uuidSchema,
  mobileNumber: phoneNumberSchema,
  fatherName: inputFieldSchema,
  motherName: inputFieldSchema,
  isMarried: z.boolean(),
  spouseName: inputFieldSchema.optional(),
  spouseNumber: phoneNumberSchema.optional(),
  religion: inputFieldSchema,
  communityCategoryId: uuidSchema,
  community: inputFieldSchema,
  extraCurricularActivity: inputFieldSchema.optional()
});