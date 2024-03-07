
import { z } from "zod";
import defaults from "../../defaults.js";

const getRequestSchema = z.object({
    rows: z.coerce.number().positive().optional(),
    start: z.coerce.number().positive().transform((val) => val - 1).optional(),
    orderBy: z.string().optional(),
    reverse: z.enum(["true", "false"]).optional()
});

const inputFieldSchema = z.string()
        .min(defaults.minFieldLength)
        .trim()
        .regex(/^[\w\s.-]+$/gm, "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]");

export { getRequestSchema, inputFieldSchema };