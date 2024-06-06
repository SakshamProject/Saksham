import { z } from 'zod'
import inputFieldSchema from '../inputFieldSchema.js'

const employmentDetailsRequestSchema = z.object({
  isEmployed: z.string().transform((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    throw new Error('Invalid boolean string');
  }).optional(),
  unemployedSince: z.coerce.date().optional(),
  occupation: inputFieldSchema.optional(),
  income: z.coerce.number().optional(),
  fatherOccupation: inputFieldSchema.optional(),
  fatherIncome: z.coerce.number().optional(),
  motherOccupation: inputFieldSchema.optional(),
  motherIncome: z.coerce.number().optional(),
  spouseOccupation: inputFieldSchema.optional(),
  spouseIncome: z.coerce.number().optional(),
})
type EmploymentDetails = z.infer<typeof employmentDetailsRequestSchema>

export { employmentDetailsRequestSchema, EmploymentDetails }
