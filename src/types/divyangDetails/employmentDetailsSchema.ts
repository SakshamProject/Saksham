import { z } from 'zod'
import inputFieldSchema from '../inputFieldSchema.js'

const employmentDetailsRequestSchema = z.object({
  isEmployed: z.boolean().optional(),
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
