import { z } from "zod";
import inputFieldSchema from "../../inputFieldSchema.js";
import { Prisma, PrismaClient } from "@prisma/client";

type getSelectedServiceTypeWithServiceSchema = Prisma.ServiceTypeGetPayload<{
  select: {
    id: true;
    name: true;
    service: {
      select: {
        name: true;
      };
    };
  };
}>;

type getServiceTypeWithServiceSchema = Prisma.ServiceTypeGetPayload<{
  include: {
    service: true;
  };
}>;

type getSelectedServiceSchema = Prisma.ServiceGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

const serviceTypeRequestSchema = z.object({
  id: inputFieldSchema.optional(),
  serviceType: inputFieldSchema.transform((value) => value.toUpperCase()),
 
});

const serviceNameSchema = z.object({
  id: inputFieldSchema.optional(),
  name: inputFieldSchema.transform((value) => value.toUpperCase()),
});

const updateServiceTypeRequestSchema = z.object({
  id: inputFieldSchema.optional(),
  serviceType: inputFieldSchema.transform((value) => value.toUpperCase()),
  serviceName: z.array(serviceNameSchema),
});

type updateServiceTypeRequestSchemaType = z.infer<
  typeof updateServiceTypeRequestSchema
>;

type serviceNameSchemaType = z.infer<typeof serviceNameSchema>;

type serviceTypeRequestSchemaType = z.infer<typeof serviceTypeRequestSchema>;

type postServiceTypeType = Prisma.ServiceTypeCreateInput;

type postServiceType = Prisma.ServiceCreateInput;

type updateServiceTypeType = Prisma.ServiceTypeUpdateInput;

export {
  getServiceTypeWithServiceSchema,
  serviceTypeRequestSchema,
  serviceTypeRequestSchemaType,
  postServiceTypeType,
  postServiceType,
  getSelectedServiceTypeWithServiceSchema,
  updateServiceTypeType,
  getSelectedServiceSchema,
  updateServiceTypeRequestSchema,
  updateServiceTypeRequestSchemaType,
  serviceNameSchemaType,
};
