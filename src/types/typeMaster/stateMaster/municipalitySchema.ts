import { z } from "zod";
import inputFieldSchema from "../../inputField.js";

const municipalitySchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
  districtId: inputFieldSchema,
});
type Municipality = z.infer<typeof municipalitySchema>;

export { Municipality, municipalitySchema };
