import { z } from 'zod'
import inputFieldSchema, { uuidSchema } from '../inputFieldSchema.js'

const addressRequestSchema = z
  .object({
    doorNumber: z.string(),
    flatNumber: z.string().optional(),
    streetName: inputFieldSchema,
    nagarName: inputFieldSchema.optional(),
    districtId: uuidSchema,
    doorNumberCommunication: z.string(),
    flatNumberCommunication: z.string().optional(),
    nagarNameCommunication: inputFieldSchema,
    districtIdCommunication: uuidSchema,
    isRural: z.boolean(),
    villageName: inputFieldSchema.optional(),
    panchayatUnionId: uuidSchema.optional(),
    talukId: uuidSchema.optional(),
    townPanchayatId: uuidSchema.optional(),
    municipalityId: uuidSchema.optional(),
    corporationId: uuidSchema.optional(),
    MLAConstituencyId: uuidSchema.optional(),
    MPConstituencyId: uuidSchema.optional(),
    pincode: z.number().min(100000).max(999999),
  })
  .refine(
    (data) => {
      if (data.isRural) {
        return (
          data.villageName !== undefined && data.panchayatUnionId !== undefined
        )
      } else {
        return (
          data.MLAConstituencyId !== undefined &&
          data.MPConstituencyId !== undefined
        )
      }
    },
    {
      message:
        'Validation failed: If rural, villageName and panchayatUnionId are mandatory; if urban, MLAConstituencyId and MPConstituencyId are mandatory',
    },
  )
type Address = z.infer<typeof addressRequestSchema>
export { addressRequestSchema, Address }
