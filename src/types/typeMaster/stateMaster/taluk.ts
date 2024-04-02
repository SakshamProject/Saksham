import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

const talukSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema.toUpperCase(),
  districtId: inputFieldSchema,
});
type Taluk = z.infer<typeof talukSchema>;

export { talukSchema, Taluk };
