import { z } from "zod";
import { sortOrderEnum } from "./getRequestSchema.js";

const filterRequestSchema = z.object({
  rows: z.coerce.number().positive().optional(),
  start: z.coerce
    .number()
    .positive()
    .transform((val) => val - 1)
    .optional(),
  orderBy: z.string().optional(),
  sortOrder: z.nativeEnum(sortOrderEnum).optional(),
});

type filterRequestType = z.infer<typeof filterRequestSchema>;
export default filterRequestSchema;
export { filterRequestType };
