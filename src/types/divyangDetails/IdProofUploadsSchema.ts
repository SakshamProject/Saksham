import { z } from 'zod'
import inputFieldSchema from '../inputFieldSchema.js'

const IdProofUploadsRequestSchema = z.object({
  voterId: inputFieldSchema,
  panCardNumber: z
    .string()
    .regex(/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN card number format'),
  drivingLicense: z.string().length(64),
  rationCardNumber: z.string().length(64),
  aadharCardNumber: z
    .string()
    .length(12)
    .regex(/^\d{12}$/, 'Invalid Aadhaar number format'),
  pensionCardNumber: z.string().length(64),
  medicalInsuranceNumber: z.string().length(64),
  disabilitySchemeNumber: z.string().length(64),
  BPL_OR_APL_Number: z.string().length(64),
})

export {IdProofUploadsRequestSchema}