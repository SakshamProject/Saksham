import { z } from 'zod'
import inputFieldSchema from '../inputFieldSchema.js'

const employmentDetailsRequestSchema = z.object({
  isEmployed: z.string().transform((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    throw new Error('Invalid boolean string');
  }).optional(),
  unemployedSince: z.date().optional(),
  occupation: inputFieldSchema.optional(),
  income: z.number().optional(),
  fatherOccupation: inputFieldSchema.optional(),
  fatherIncome: z.number().optional(),
  motherOccupation: inputFieldSchema.optional(),
  motherIncome: z.number().optional(),
  spouseOccupation: inputFieldSchema.optional(),
  spouseIncome: z.number().optional(),
})
type EmploymentDetails = z.infer<typeof employmentDetailsRequestSchema>

export { employmentDetailsRequestSchema, EmploymentDetails }
