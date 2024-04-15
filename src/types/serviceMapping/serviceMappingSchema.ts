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
    userId: uuidSchema.optional(),
    serviceId: uuidSchema,
    dateOfService: dateSchema,
    dueDate: dateSchema,
    isNonSevaKendraFollowUpRequired: z.boolean().optional(),
    nonSevaKendraFollowUp: nonSevaKendraFollowUpSchema.optional(),
  })
  .refine(
    (data) => {
      if (data.userId) {
        return (
          data.nonSevaKendraFollowUp === undefined
        );
      } else {
        return (
         
          data.userId === undefined &&
          data.nonSevaKendraFollowUp !== undefined
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
    isNonSevaKendraFollowUpRequired: data.userId ? false : true,
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
