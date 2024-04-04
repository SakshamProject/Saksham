
import { string, z } from "zod";
import defaults from "../defaults.js";

const getRequestSchema = z.object({
    searchText: z.string().optional(),
    rows: z.coerce.number().positive().optional(),
    start: z.coerce.number().positive().transform((val) => val - 1).optional(),
    orderBy: z.string().optional(),
    sortOrder: z.enum(["asc", "desc"]).optional()
});

const filterOperations = z.enum(["equals", "notEquals", "startsWith", "endsWith"]);
type filterOperationsEnum = z.infer<typeof filterOperations>;

const filter = z.object({
    operation: filterOperations,
    value: z.string() 
});


// TODO: Allow Punctuation
const inputFieldSchema = z.string()
        .min(defaults.minFieldLength)
        .trim()
        .regex(/^[\w\s.-]+$/gm, "No Special Characters. Allowed: [A-Z, a-z, 0-9, ., -, _]");
        
export { getRequestSchema, inputFieldSchema, filter, filterOperations, filterOperationsEnum};