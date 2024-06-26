import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";

const townPanchayatSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema,
  districtId: inputFieldSchema,
});
type TownPanchayat = z.infer<typeof townPanchayatSchema>;

export { townPanchayatSchema, TownPanchayat };
