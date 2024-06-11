import { z } from "zod";
import {
  personalDetailsRequestSchema,
  updatePersonalDetailsRequestSchema,
} from "./personalDetailsSchema.js";
import { IdProofUploadsRequestSchema } from "./IdProofUploadsSchema.js";
import { addressRequestSchema } from "./addressSchema.js";
import { disabiltyDetailsRequestSchema } from "./disabilityDetailsSchema.js";
import { employmentDetailsRequestSchema } from "./employmentDetailsSchema.js";
import { Prisma } from "@prisma/client";
import {
  auditLogSchema,
  filterOperationsEnum,
  uuidSchema,
} from "../inputFieldSchema.js";
import {
  DivyangDetailsColumnNamesEnum,
  DivyangDetailsSearchColumnNamesEnum,
} from "./divyangDetailsDefaults.js";
import { sortOrderEnum } from "../getRequestSchema.js";

type getDivyangDetailsType = Prisma.DivyangDetailsGetPayload<{
  include: {
    corporation: true;
    mlaconstituency: true;
    mpconstituency: true;
    municipality: true;
    townPanchayat: true;
    taluk: true;
    panchayatUnion: true;
    district: {
      include: { state: true };
    };
    corporationCommunication: true;
    mlaconstituencyCommunication: true;
    mpconstituencyCommunication: true;
    municipalityCommunication: true;
    townPanchayatCommunication: true;
    talukCommunication: true;
    panchayatUnionCommunication: true;
    districtCommunication: {
      include: { state: true };
    };
    person: {
      select: {
        id: true;
        userName: true;
      };
    };
    auditLog: true;
    communityCategory: true;
    createdBy: {
      select: {
        id: true;
        userName: true;
      };
    };
    updatedBy: {
      select: {
        id: true;
        userName: true;
      };
    };
    disabilities: {
      include: {
        disabilityType: true;
        disabilitySubType: true;
      };
    };
    educationQualifications: {
      include: {
        educationQualification: true;
        educationQualificationType: true;
      };
    };
    services: true;
  };
}>;
const divyangDetailsFilter = z
  .object({
    operation: z.nativeEnum(filterOperationsEnum),
    field: z.nativeEnum(DivyangDetailsColumnNamesEnum),
    value: z.string(),
  })
  .array();

type DivyangDetailsFilterType = z.infer<typeof divyangDetailsFilter>;
const getDivyangDetailsSearch = z.object({
  column: z.nativeEnum(DivyangDetailsSearchColumnNamesEnum),
  value: z.string(),
});
type DivyangDetailsSearchType = z.infer<typeof getDivyangDetailsSearch>;

const getDivyangDetailsSchema = z.object({
  filters: divyangDetailsFilter.optional(),
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
      orderByColumn: z.nativeEnum(DivyangDetailsColumnNamesEnum),
      sortOrder: z.nativeEnum(sortOrderEnum),
    })
    .optional(),
});
type DivyangDetailsSchemaType = z.infer<typeof getDivyangDetailsSchema>;

const divyangDetailsRequestSchema = z
  .object({
    id: uuidSchema,
    personId: uuidSchema,
    personalDetails: updatePersonalDetailsRequestSchema,
    IdProofUploads: IdProofUploadsRequestSchema,
    addressRequest: addressRequestSchema,
    disabilityDetails: disabiltyDetailsRequestSchema,
    employmentDetails: employmentDetailsRequestSchema,
    auditLog: auditLogSchema,
  })
  .refine((data) => {
    return Object.values(data).some((value) => value !== undefined);
  }, "At least one of the five schemas must be provided.");

const updateDivyangDetailsRequestSchema = z
  .object({
    id: uuidSchema,
    personId: uuidSchema,
    personalDetails: updatePersonalDetailsRequestSchema.optional(),
    IdProofUploads: IdProofUploadsRequestSchema.optional(),
    addressRequest: addressRequestSchema.optional(),
    disabilityDetails: disabiltyDetailsRequestSchema.optional(),
    employmentDetails: employmentDetailsRequestSchema.optional(),
    auditLog: auditLogSchema.optional(),
    pageNumber: z.coerce.number().min(1).max(5),
  })
  .refine((data) => {
    return Object.values(data).some((value) => value !== undefined);
  }, "At least one of the five schemas must be provided.");

const postDivyangDetailsRequestSchema = z.object({
  personalDetails: personalDetailsRequestSchema,
});

type DivyangDetailsRequest = z.infer<typeof divyangDetailsRequestSchema>;

type updateDivyangDetailsRequest = z.infer<
  typeof updateDivyangDetailsRequestSchema
>;

type postDivyangDetailsRequest = z.infer<
  typeof postDivyangDetailsRequestSchema
>;

type updateDivyangDetails = Prisma.DivyangDetailsUpdateInput;

type createDivyangDetails = Prisma.DivyangDetailsCreateInput;
type DivyangDetailsWhere = Prisma.DivyangDetailsWhereInput;
export {
  DivyangDetailsSchemaType,
  DivyangDetailsFilterType,
  divyangDetailsRequestSchema,
  DivyangDetailsRequest,
  getDivyangDetailsType,
  updateDivyangDetails,
  updateDivyangDetailsRequestSchema,
  updateDivyangDetailsRequest,
  postDivyangDetailsRequest,
  postDivyangDetailsRequestSchema,
  createDivyangDetails,
  DivyangDetailsWhere,
  getDivyangDetailsSearch,
  DivyangDetailsSearchType,
  getDivyangDetailsSchema,
};
