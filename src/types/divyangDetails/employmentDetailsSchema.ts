import { z } from 'zod'
import inputFieldSchema from '../inputFieldSchema.js'

const employmentDetailsRequestSchema = z.object({
  isEmployed: z.boolean(),
  unemployedSince: z.date(),
  occupation: inputFieldSchema,
  income: z.number(),
  fatherOccupation: inputFieldSchema,
  fatherIncome: z.number(),
  motherOccupation: inputFieldSchema,
  motherIncome: z.number(),
  spouseOccupation: inputFieldSchema.optional(),
  spouseIncome: z.number().optional(),
})

export {employmentDetailsRequestSchema}