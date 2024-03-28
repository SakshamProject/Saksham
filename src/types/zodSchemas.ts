
import { z } from "zod";
import defaults from "../defaults.js";

const getRequestSchema = z.object({
    rows: z.coerce.number().positive().optional(),
    start: z.coerce.number().positive().transform((val) => val - 1).optional(),
    orderBy: z.string().optional(),
    reverse: z.string().toLowerCase().transform((val) => val === "true").optional()
    // ^^
    // Since "true" and "false" are both non-empty strings they are converted to true
    // so instead of z.enum(["true", "false"]) we explicitly convert them to boolean
});

type Query = z.infer<typeof getRequestSchema>;

// TODO: Allow Punctuation
const inputFieldSchema = z.string()
        .min(defaults.minFieldLength)
        .trim()
        .regex(/^[\w\s.-]+$/gm, "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]");
        
export { getRequestSchema, inputFieldSchema, Query };