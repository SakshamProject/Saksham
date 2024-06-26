import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";

const corporationSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
  districtId: inputFieldSchema,
});
type Corporation = z.infer<typeof corporationSchema>;
export { corporationSchema, Corporation };
