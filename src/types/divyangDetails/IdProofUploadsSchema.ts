import { z } from 'zod'
import inputFieldSchema, { alphaNumericSchema } from '../inputFieldSchema.js'

const IdProofUploadsRequestSchema = z
  .object({
    voterIdNumber: alphaNumericSchema.optional(),
    panCardNumber: alphaNumericSchema.optional(),
    drivingLicenseNumber: alphaNumericSchema.optional(),
    rationCardNumber: alphaNumericSchema.optional(),
    aadharCardNumber: alphaNumericSchema.optional(),
    pensionCardNumber: alphaNumericSchema.optional(),
    medicalInsuranceNumber: alphaNumericSchema.optional(),
    disabilitySchemeNumber: alphaNumericSchema.optional(),
    BPL_OR_APL_Number: alphaNumericSchema.optional(),
    fileNames: z
      .object({
        voterIdFileName: z.string().nullable().optional(),
        panCardFileName: z.string().nullable().optional(),
        drivingLicenseFileName: z.string().nullable().optional(),
        rationCardFileName: z.string().nullable().optional(),
        aadharCardFileName: z.string().nullable().optional(),
        pensionCardFileName: z.string().nullable().optional(),
        medicalInsuranceCardFileName: z.string().nullable().optional(),
        disabilitySchemeCardFileName: z.string().nullable().optional(),
        bplOrAplCardFileName: z.string().nullable().optional(),
      })
      .optional(),
  })
  .refine(
    (data) => {
      const ids = [
        data.voterIdNumber,
        data.panCardNumber,
        data.drivingLicenseNumber,
        data.rationCardNumber,
        data.aadharCardNumber,
        data.pensionCardNumber,
        data.medicalInsuranceNumber,
        data.disabilitySchemeNumber,
        data.BPL_OR_APL_Number,
      ]
      const providedIds = ids.filter((id) => id !== undefined)
      return providedIds.length >= 2
    },
    {
      message: 'At least two ID numbers must be provided.',
    },
  )

type IdProofUploads = z.infer<typeof IdProofUploadsRequestSchema>

export { IdProofUploadsRequestSchema, IdProofUploads }
