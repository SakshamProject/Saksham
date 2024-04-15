import { Prisma } from "@prisma/client";
import { z } from "zod";

type ServiceMappingWhere = Prisma.DivyangServiceMappingWhereInput;

const sevaMappingFilter = z
  .object({
    operation: z.nativeEnum(filterOperationsEnum),
    field: z.nativeEnum(SevaKendraColumnNamesEnum),
    value: z.string(),
  })
  .array();
const getServiceMappingSchema = z.object({

})

export { ServiceMappingWhere };
