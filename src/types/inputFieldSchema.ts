import { z } from "zod";
import defaults from "../defaults.js";
import {specialCharsRegex, phoneNumberRegex} from "./regex.js";

const inputFieldSchema = z
  .string()
  .min(defaults.minFieldLength)
  .trim()
  .regex(
    specialCharsRegex,
    "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]"
  );
const queryParamsSchema = z.string().optional();

const phoneNumberSchema = z.string().length(10).regex(phoneNumberRegex);
const emailSchema = z.string().email();
const landLineNumberSchema = z.string().min(6).regex(phoneNumberRegex);
const uuidSchema = z.string().uuid();
// const queryParamsSchema = z.string().optional();

export { queryParamsSchema, phoneNumberSchema, emailSchema, landLineNumberSchema, uuidSchema };
export default inputFieldSchema;
