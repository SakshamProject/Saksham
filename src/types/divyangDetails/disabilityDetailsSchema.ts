import { z } from 'zod'
import inputFieldSchema, { uuidSchema } from '../inputFieldSchema.js'
import { CertificateIssueAuthority } from '@prisma/client'

const disabiltyDetailsRequestSchema = z.object({
  isDisabilitySinceBirth: z.boolean(),
  disabilitySince: z.date(),
  disabilityArea: inputFieldSchema,
  disabilityPercentage: z.number().min(0).max(100),
  disabilityDueTo: inputFieldSchema,
  certificateIssueAuthority: z.nativeEnum(CertificateIssueAuthority),
  disabilityCardUrl: z.string(),
  disabilityDistrictId: uuidSchema,
  identityCardNumber: z.string().length(64),
  udidCardNumber: z.string().length(64),
  udidEnrollmentNumber: z.string().length(64),
  udidCardUrl: z.string(),
})

export {disabiltyDetailsRequestSchema}