import { z } from "zod";
export enum sortOrderEnum {
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
  sortOrder: z.nativeEnum(sortOrderEnum).optional(),
  searchText: z.string().optional(),
});

export type getRequestType = z.infer<typeof getRequestSchema>;
export default getRequestSchema;
