import { z } from "zod";
enum orderByDirection {
  ascending = "asc",
  descending = "desc",
}

const getRequestSchema = z.object({
  rows: z.coerce.number().positive().optional(),
  start: z.coerce
    .number()
    .positive()
    .transform((val) => val - 1)
    .optional(),
  orderBy: z.string().optional(),
  orderByDirection: z.nativeEnum(orderByDirection).optional(),
});
export default getRequestSchema;
