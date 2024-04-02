import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

const corporationSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema.toUpperCase(),
  districtId: inputFieldSchema,
});
type Corporation = z.infer<typeof corporationSchema>;
export { corporationSchema, Corporation };
