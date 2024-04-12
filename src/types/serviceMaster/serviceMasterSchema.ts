import { z } from "zod";
import inputFieldSchema, {filter} from "./../inputFieldSchema.js";
import {sortOrderEnum} from "../getRequestSchema.js";

const postServiceMasterSchema = z.object({
  serviceTypeId: z.string().uuid(),
  name: inputFieldSchema.toUpperCase(),
});
type postServiceMasterType = z.infer<typeof postServiceMasterSchema>;

const filterServiceMasterSchema = z.object({
  serviceName: filter.optional(),
  serviceTypeName: filter.optional(),
});
type filterServiceMasterType = z.infer<typeof filterServiceMasterSchema>;

const putServiceMasterSchema = z.object({
  serviceTypeId: z.string().uuid(),
  name: inputFieldSchema.toUpperCase(),
});
type putServiceMasterType = z.infer<typeof putServiceMasterSchema>;

enum filterOperationsEnum {
  startsWith = "startsWith",
  endsWith = "endsWith",
  equals = "equals",
  notEquals = "notEquals"
}

enum serviceMasterFilterColumnNamesEnum {
  serviceName= "serviceName",
  serviceTypeName= "serviceTypeName"
}

enum serviceMasterOrderByEnum {
  createdAt = "createdAt",
  updatedAt = "updatedAt",
  serviceTypeName = "serviceTypeName"
}

const serviceMasterFilterSchema = z.object({
  operation: z.nativeEnum(filterOperationsEnum),
  field: z.nativeEnum(serviceMasterFilterColumnNamesEnum),
  value: z.string()
}).array();

const paginationSchema = z.object({
  start: z.coerce.number().positive(),
  rows: z.coerce.number().positive(),
});

const listServiceMasterSchema = z.object({
  filters: serviceMasterFilterSchema.optional(),
  pagination: paginationSchema.optional(),
  searchText: z.string().optional(),
  sorting: z.object({
    orderByColumn: z.nativeEnum(serviceMasterOrderByEnum),
    sortOrder: z.nativeEnum(sortOrderEnum),
  }).optional()
});
type listServiceMasterType = z.infer<typeof listServiceMasterSchema>;

export {
  postServiceMasterSchema,
  listServiceMasterSchema,
  putServiceMasterSchema,
  filterServiceMasterSchema,
  postServiceMasterType,
  putServiceMasterType,
  filterServiceMasterType,
    listServiceMasterType
};
