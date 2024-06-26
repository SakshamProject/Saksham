import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";

const panchayatUnionSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
  districtId: inputFieldSchema,
});
type PanchayatUnion = z.infer<typeof panchayatUnionSchema>;

export { panchayatUnionSchema, PanchayatUnion };
