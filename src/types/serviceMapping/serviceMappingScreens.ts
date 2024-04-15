import { Prisma } from "@prisma/client";
import { z } from "zod";
import { filterOperationsEnum } from "../inputFieldSchema.js";
import { ServiceMappingColumnNamesEnum } from "./serviceMappingDefaults.js";

type ServiceMappingWhere = Prisma.DivyangServiceMappingWhereInput;

const serviceMappingFilter = z
  .object({
    operation: z.nativeEnum(filterOperationsEnum),
    field: z.nativeEnum(ServiceMappingColumnNamesEnum),
    value: z.string(),
  })
  .array();
type serviceMappingFilterType = z.infer<typeof serviceMappingFilter>;
const getServiceMappingSchema = z.object({});

export { ServiceMappingWhere };
