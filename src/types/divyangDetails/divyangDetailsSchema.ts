import { z } from "zod";
import { personalDetailsRequestSchema } from "./personalDetailsSchema.js";
import { IdProofUploadsRequestSchema } from "./IdProofUploadsSchema.js";
import { addressRequestSchema } from "./addressSchema.js";
import { disabiltyDetailsRequestSchema } from "./disabilityDetailsSchema.js";
import { employmentDetailsRequestSchema } from "./employmentDetailsSchema.js";

const divyangDetailsRequestSchema = z.object({
    personalDetailsRequestSchema: personalDetailsRequestSchema,
    IdProofUploadsRequestSchema: IdProofUploadsRequestSchema,
    addressRequestSchema: addressRequestSchema,
    disabiltyDetailsRequestSchema: disabiltyDetailsRequestSchema,
    employmentDetailsRequestSchema: employmentDetailsRequestSchema
}).refine()