import { z } from 'zod'
import inputFieldSchema, { uuidSchema } from '../inputFieldSchema.js'
import { CertificateIssueAuthorityEnum } from '@prisma/client'

const disabiltyDetailsRequestSchema = z
  .object({
    disabilityTypeId: uuidSchema,
    disabilitySubTypeId: uuidSchema.optional(),
    isDisabilitySinceBirth: z.boolean(),
    disabilitySince: z.date(),
    disabilityArea: inputFieldSchema,
    disabilityPercentage: z.number().min(0).max(100),
    disabilityDueTo: inputFieldSchema,
    certificateIssueAuthority: z.nativeEnum(CertificateIssueAuthorityEnum),
    disabilityCardUrl: z.string(),
    districtCode: z.string(),
    stateCode: z.string(),
    identityCardNumber: z.string().length(64),
    udidCardNumber: z.string().length(64),
    udidCardUrl: z.string(),
    udidEnrollmentNumber: z.string().length(64),
  })
  .refine((data) => {
    return (
      data.udidCardNumber !== undefined &&
      data.udidEnrollmentNumber !== undefined
    )
  })
  type DisabilityDetails = z.infer<typeof disabiltyDetailsRequestSchema>

export { disabiltyDetailsRequestSchema, DisabilityDetails }
