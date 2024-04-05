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

const phoneNumberSchema = z.string().length(10);
const emailSchema = z.string().email();
const landLineNumberSchema = z.string().min(6);
const uuidSchema = z.string().uuid();
const queryParamsSchema = z.string().optional();

export {
  phoneNumberSchema,
  emailSchema,
  landLineNumberSchema,
  uuidSchema,
  queryParamsSchema,
};
export default inputFieldSchema;
