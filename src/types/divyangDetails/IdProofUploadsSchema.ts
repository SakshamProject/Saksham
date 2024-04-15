import { z } from 'zod'
import inputFieldSchema from '../inputFieldSchema.js'

const IdProofUploadsRequestSchema = z
  .object({
    voterId: inputFieldSchema.optional(),
    panCardNumber: z
      .string()
      .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN card number format')
      .optional(),
    drivingLicense: z.string().length(64).optional(),
    rationCardNumber: z.string().length(64).optional(),
    aadharCardNumber: z
      .string()
      .length(12)
      .regex(/^\d{12}$/, 'Invalid Aadhaar number format')
      .optional(),
    pensionCardNumber: z.string().length(64).optional(),
    medicalInsuranceNumber: z.string().length(64).optional(),
    disabilitySchemeNumber: z.string().length(64).optional(),
    BPL_OR_APL_Number: z.string().length(64).optional(),
  })
  .refine(
    (val) => Object.values(val).filter((v) => v !== undefined).length >= 2,
    'At least two fields must be present',
  )
type IdProofUploads = z.infer<typeof IdProofUploadsRequestSchema>

export { IdProofUploadsRequestSchema, IdProofUploads }
