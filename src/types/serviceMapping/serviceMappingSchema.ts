import { z } from "zod";
import inputFieldSchema, {
  dateSchema,
  emailSchema,
  phoneNumberSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { Prisma } from "@prisma/client";

const nonSevaKendraFollowUpSchema = z.object({
  name: inputFieldSchema,
  mobileNumber: phoneNumberSchema,
  email: emailSchema,
  sendMail: z.boolean(),
});

const postServiceMappingRequestSchema = z
  .object({
    divyangId: uuidSchema,
    sevaKendraId: uuidSchema,
    userId: uuidSchema,
    serviceId: uuidSchema,
    dateOfService: dateSchema,
    dueDate: dateSchema,
    isNonSevaKendraVolunteerRequired: z.boolean(),
    nonSevaKendraFollowUp: nonSevaKendraFollowUpSchema,
  })
  .refine(
    (data) => {
      if (data.sevaKendraId) {
        return (
          data.userId !== undefined && data.nonSevaKendraFollowUp == undefined
        );
      } else {
        return (
          data.sevaKendraId !== undefined &&
          data.userId !== undefined &&
          data.nonSevaKendraFollowUp == undefined
        );
      }
    },
    {
      message:
        "Validation failed: Either SevaKendra detail or non-sevaKendra volunteer detail has to be given completely",
    }
  )
  .transform((data) => ({
    ...data,
    isNonSevaKendraVolunteerRequired: data.sevaKendraId ? false : true,
  }));

type postServiceMappingRequestSchemaType = z.infer<
  typeof postServiceMappingRequestSchema
>;

type postServiceMappingType = Prisma.DivyangServiceMappingCreateInput;

type postNonSevaKendraFollowUpType = Prisma.NonSevaKendraFollowUpCreateInput;

export {
  postServiceMappingRequestSchema,
  postServiceMappingRequestSchemaType,
  postServiceMappingType,
  postNonSevaKendraFollowUpType,
};
