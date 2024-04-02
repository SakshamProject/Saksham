import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

const panchayatUnionSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema.toUpperCase(),
  districtId: inputFieldSchema,
});
type PanchayatUnion = z.infer<typeof panchayatUnionSchema>;

export { panchayatUnionSchema, PanchayatUnion };
