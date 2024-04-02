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
  orderByDirection: z.nativeEnum(orderByDirectionEnum).optional(),
  searchText:z.string().optional(),
});
export default getRequestSchema;
