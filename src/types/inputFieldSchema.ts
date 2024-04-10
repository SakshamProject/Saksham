import { z } from "zod";
import defaults from "../defaults.js";
import {specialCharsRegex, phoneNumberRegex} from "./regex.js";
import isISODate from "is-iso-date";

const inputFieldSchema = z
  .string()
  .min(defaults.minFieldLength)
  .trim()
  .regex(
    specialCharsRegex,
    "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]"
  );
const queryParamsSchema = z.string().optional();

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

const phoneNumberSchema = z.string().length(10).regex(phoneNumberRegex);
const emailSchema = z.string().email();
const landLineNumberSchema = z.string().min(6).regex(phoneNumberRegex);
const uuidSchema = z.string().uuid();
// const queryParamsSchema = z.string().optional();
const dateSchema = z.string().refine(isISODate, { message: "Not a valid ISO 8601 string date "});

export { queryParamsSchema, filter, filterOperations, filterOperationsEnum, inputFieldSchema };
export default inputFieldSchema;