import { z } from 'zod'
import { personalDetailsRequestSchema } from './personalDetailsSchema.js'
import { IdProofUploadsRequestSchema } from './IdProofUploadsSchema.js'
import { addressRequestSchema } from './addressSchema.js'
import { disabiltyDetailsRequestSchema } from './disabilityDetailsSchema.js'
import { employmentDetailsRequestSchema } from './employmentDetailsSchema.js'
import { Prisma } from '@prisma/client'

type getDivyangDetailsSchema = Prisma.DivyangDetailsGetPayload<{}>

const divyangDetailsRequestSchema = z
  .object({
    personalDetails: personalDetailsRequestSchema,
    IdProofUploads: IdProofUploadsRequestSchema,
    addressRequest: addressRequestSchema,
    disabiltyDetails: disabiltyDetailsRequestSchema,
    employmentDetails: employmentDetailsRequestSchema,
  })
  .refine((data) => {
    return Object.values(data).some((value) => value !== undefined)
  }, 'At least one of the five schemas must be provided.')

const updateDivyangDetailsRequestSchema = z
  .object({
    personalDetails: personalDetailsRequestSchema,
    IdProofUploads: IdProofUploadsRequestSchema,
    addressRequest: addressRequestSchema,
    disabiltyDetails: disabiltyDetailsRequestSchema,
    employmentDetails: employmentDetailsRequestSchema,
    pageNumber: z.number().min(1).max(5),
  })
  .refine((data) => {
    return Object.values(data).some((value) => value !== undefined)
  }, 'At least one of the five schemas must be provided.')

const postDivyangDetailsRequestSchema = z.object({
  personalDetails: personalDetailsRequestSchema,
})

type DivyangDetailsRequest = z.infer<typeof divyangDetailsRequestSchema>

type updateDivyangDetailsRequest = z.infer<
  typeof updateDivyangDetailsRequestSchema
>

type postDivyangDetailsRequest = z.infer<typeof postDivyangDetailsRequestSchema>

type updateDivyangDetails = Prisma.DivyangDetailsUpdateInput

type createDivyangDetails = Prisma.DivyangDetailsCreateInput

export {
  divyangDetailsRequestSchema,
  DivyangDetailsRequest,
  getDivyangDetailsSchema,
  updateDivyangDetails,
  updateDivyangDetailsRequestSchema,
  updateDivyangDetailsRequest,
  postDivyangDetailsRequest,
  postDivyangDetailsRequestSchema,
  createDivyangDetails
}
