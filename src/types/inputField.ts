import { z } from "zod";
import defaults from "../defaults.js";
import { orderByDirectionEnum } from "../controllers/getRequest.schema.js";

const inputFieldSchema = z
  .string()
  .min(defaults.minFieldLength)
  .trim()
  .regex(
    /^[\w\s.-]+$/gm,
    "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]"
  );
export const queryParamsSchema = z.string().optional();

export default inputFieldSchema;
