import { z } from "zod";
import { AuditLogStatusEnum, Prisma } from "@prisma/client";
import inputFieldSchema, { auditLogSchema, filterOperationsEnum } from "../inputFieldSchema.js";
import { sortOrderEnum } from "../getRequestSchema.js";
import { designationColumnNamesEnum } from "./designationEnum.js";

const postDesignationRequestSchema = z.object({
  sevaKendraId: z.string(),
  designation: inputFieldSchema.toUpperCase(),
  featuresId: z.array(z.string()).min(1)
});

type postDesignationRequestSchemaType = z.infer<
  typeof postDesignationRequestSchema
>;

type postDesignationType = Prisma.DesignationCreateInput;

type postFeaturesOnDesignationsType = Prisma.FeaturesOnDesignationsCreateInput;

type postAuditLogObjectType = Prisma.DesignationAuditLogCreateInput;

const featuresSchema = z.object({
  id: inputFieldSchema,
  name: inputFieldSchema.transform((value) => value.toUpperCase()).optional(),
});


const updateDesignationRequestSchema = z.object({
  sevaKendraId: z.string(),
  designation: z.string().toUpperCase(),
  features: z.array(featuresSchema),
  auditLog:auditLogSchema
})

const designationFilter = z
  .object({
    operation: z.nativeEnum(filterOperationsEnum),
    field: z.nativeEnum(designationColumnNamesEnum),
    value: z.string(),
  })
  .array();

const getDesignationSchema = z.object({
  filters: designationFilter.optional(),
  pagination: z
    .object({
      rows: z.number(),
      start: z.number(),
    })
    .optional(),
  searchText: z.string().optional(),
  sorting: z
    .object({
      orderByColumn: z.nativeEnum(designationColumnNamesEnum),
      sortOrder: z.nativeEnum(sortOrderEnum),
    })
    .optional(),
});
type designationFilterType = z.infer<typeof designationFilter>;
type getDesignationSchemaType = z.infer<typeof getDesignationSchema>;

type updateDesignationRequestSchemaType =  z.infer<
typeof updateDesignationRequestSchema
>;
type featuresSchemaType =  z.infer<
typeof featuresSchema
>;
type updateDesignationObjectType = Prisma.DesignationUpdateInput;
type DesignationWhere = Prisma.DesignationWhereInput;

export {
  postDesignationRequestSchema,
  postDesignationRequestSchemaType,
  postDesignationType,
  postFeaturesOnDesignationsType,
  updateDesignationRequestSchema,
  updateDesignationRequestSchemaType,
  updateDesignationObjectType,
  featuresSchemaType,
  postAuditLogObjectType,
  designationFilterType,
  getDesignationSchemaType,
  getDesignationSchema,
  DesignationWhere
};
