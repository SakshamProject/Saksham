
import { z } from "zod";

const getRequestSchema = z.object({
    rows: z.coerce.number().positive().optional(),
    start: z.coerce.number().positive().transform((val) => val - 1).optional(),
    orderBy: z.string().optional(),
    reverse: z.enum(["true", "false"]).optional()
});

export default getRequestSchema;