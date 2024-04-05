import { z } from "zod";
import inputFieldSchema, { uuidSchema } from "../../inputFieldSchema.js";

const addressRequestSchema = z.object({
    doorNumber: inputFieldSchema,
    flatNumber: inputFieldSchema,
    streetName: inputFieldSchema,
    nagarName: inputFieldSchema,
    districtId: uuidSchema,
    isRural: z.boolean(),
    villageName: inputFieldSchema,
    panchayatUnionId: uuidSchema,
    talukId: uuidSchema,
    townPanchayatId: uuidSchema,
    municipalityId: uuidSchema,
    corporationId: uuidSchema,
    MLAConstituencyId: uuidSchema,
    MPConstituancyId: uuidSchema,
    pincode: z.number().min(0).max(999999)
})