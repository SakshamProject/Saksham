import { z } from "zod";
import defaults from "../defaults.js";

const inputFieldSchema = z
  .string()
  .min(defaults.minFieldLength)
  .trim()
  .regex(
    /^[\w\s.-]+$/gm,
    "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]"
  );
export const queryParamsSchema = z.string().optional();

const filterOperations = z.enum([
  "equals",
  "notEquals",
  "startsWith",
  "endsWith",
]);
type filterOperationsEnum = z.infer<typeof filterOperations>;
const filter = z.object({
  operation: filterOperations,
  value: z.string(),
});

export { filter, filterOperations, filterOperationsEnum, inputFieldSchema };
export default inputFieldSchema;
