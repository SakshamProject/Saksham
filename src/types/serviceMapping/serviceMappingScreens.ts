import { Prisma } from "@prisma/client";
import { z } from "zod";
import { filterOperationsEnum } from "../inputFieldSchema.js";
import { ServiceMappingColumnNamesEnum } from "./serviceMappingDefaults.js";
import { sortOrderEnum } from "../getRequestSchema.js";

type ServiceMappingWhere = Prisma.DivyangServiceMappingWhereInput;

const serviceMappingFilter = z
  .object({
    operation: z.nativeEnum(filterOperationsEnum),
    field: z.nativeEnum(ServiceMappingColumnNamesEnum),
    value: z.string(),
  })
  .array();
type serviceMappingFilterType = z.infer<typeof serviceMappingFilter>;
const getServiceMappingSchema = z.object({
  filter: serviceMappingFilter.optional(),
  pagination: z
    .object({
      rows: z.number().positive(),
      start: z
        .number()
        .positive()
        .transform((number) => number - 1),
    })
    .optional(),
  searchText: z.string().optional(),
  sorting: z
    .object({
      orderByColumn: z.nativeEnum(ServiceMappingColumnNamesEnum),
      sortOrder: z.nativeEnum(sortOrderEnum),
    })
    .optional(),
});
type getServiceMappingSchemaType = z.infer<typeof getServiceMappingSchema>;
export {
  ServiceMappingWhere,
  getServiceMappingSchema,
  getServiceMappingSchemaType,
};
