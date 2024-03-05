
import { z } from "zod";

const getRequestSchema = z.object({
    rows: z.coerce.number(),
    start: z.coerce.number(),
    orderBy: z.string(),
    reverse: z.enum(["true", "false"])
});

export default getRequestSchema;