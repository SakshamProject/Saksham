import { z } from "zod";
export enum orderByDirectionEnum {
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
  orderByColumn: z.string().optional(),
  sortOrder: z.nativeEnum(orderByDirectionEnum).optional(),
});
export default getRequestSchema;
