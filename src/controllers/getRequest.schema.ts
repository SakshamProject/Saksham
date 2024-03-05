
import { z } from "zod";

const getRequestSchema = z.object({
    rows: z.coerce.number().optional(),
    start: z.coerce.number().optional(),
    orderBy: z.string().optional(),
    reverse: z.enum(["true", "false"]).optional()
});

export default getRequestSchema;