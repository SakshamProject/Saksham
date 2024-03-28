import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

const MLAConstituencySchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
  districtId: inputFieldSchema,
});
type MLAConstituency = z.infer<typeof MLAConstituencySchema>;

export { MLAConstituencySchema, MLAConstituency };
