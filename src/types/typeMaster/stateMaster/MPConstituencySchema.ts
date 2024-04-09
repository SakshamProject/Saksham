import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";

const MPConstituencySchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema.toUpperCase(),
  districtId: inputFieldSchema,
});
type MPConstituency = z.infer<typeof MPConstituencySchema>;

export { MPConstituencySchema, MPConstituency };
