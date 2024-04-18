import { Prisma, StatusEnum } from "@prisma/client";
import { z } from "zod";
import { filterOperationsEnum, uuidSchema } from "../inputFieldSchema.js";
import { ServiceMappingColumnNamesEnum } from "./serviceMappingDefaults.js";
import { sortOrderEnum } from "../getRequestSchema.js";

type ServiceMappingWhere = Prisma.DivyangServiceMappingWhereInput;
const serviceAdditionalWhereSchema = z.object({
  serviceStatus: z.nativeEnum(StatusEnum).optional(),
  districtId: uuidSchema.optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  divyangId: uuidSchema.optional(),
});
type ServiceAdditionalWhereSchemaType = z.infer<
  typeof serviceAdditionalWhereSchema
>;
const serviceMappingFilter = z
  .object({
    operation: z.nativeEnum(filterOperationsEnum),
    field: z.nativeEnum(ServiceMappingColumnNamesEnum),
    value: z.string(),
  })
  .array();
type serviceMappingFilterType = z.infer<typeof serviceMappingFilter>;
const getServiceMappingSchema = z.object({
  filters: serviceMappingFilter.optional(),
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
  serviceAdditionalWhereSchema,
  ServiceAdditionalWhereSchemaType,
  ServiceMappingWhere,
  serviceMappingFilter,
  serviceMappingFilterType,
  getServiceMappingSchema,
  getServiceMappingSchemaType,
};
