import { z } from "zod";
import inputFieldSchema, {
  dateSchema,
  emailSchema,
  phoneNumberSchema,
  uuidSchema,
} from "../inputFieldSchema.js";
import { HowTheyGotServiceEnum, Prisma, StatusEnum } from "@prisma/client";

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

const donorSchema=z.object({
  name:inputFieldSchema,
  contact:phoneNumberSchema,
  address:inputFieldSchema
})


const putServiceMappingSchema =z.object({

  isCompleted:z.nativeEnum(StatusEnum) ,
  completedDate:dateSchema.optional(),
  howTheyGotService: z.nativeEnum(HowTheyGotServiceEnum).optional(),
  reasonForNonCompletion:inputFieldSchema.optional(),
  isFollowUpRequired:z.boolean().optional(),
  userId:uuidSchema.optional(),
  isNonSevaKendraFollowUpRequired:z.boolean().optional(),
  nonSevaKendraFollowUp:nonSevaKendraFollowUpSchema.optional(),
  donor:donorSchema.optional()
  
})  .refine(
  (data) => {
    if (data.isCompleted===StatusEnum.COMPLETED) {
      return (
        data.completedDate !== undefined &&
        data.howTheyGotService!==undefined &&
        data.isFollowUpRequired === undefined &&
        data.userId === undefined&&
        data.isNonSevaKendraFollowUpRequired===undefined &&
        data.nonSevaKendraFollowUp===undefined
  
      );
    } else if(data.isCompleted===StatusEnum.PENDING){
      if(data.isFollowUpRequired){
        return (
       
          data.reasonForNonCompletion !== undefined &&
          data.userId !== undefined &&
          data.donor===undefined
        );
      }else if(data.isNonSevaKendraFollowUpRequired){
        return (
       
          data.reasonForNonCompletion !== undefined &&
          data.nonSevaKendraFollowUp !== undefined
        );
      }
      else{
        return data.reasonForNonCompletion !== undefined
      }
  
    }
  },
  {
    message:
      "Validation failed: Please give necessary data",
  }
)


type postServiceMappingType = Prisma.DivyangServiceMappingCreateInput;

type postNonSevaKendraFollowUpType = Prisma.NonSevaKendraFollowUpCreateInput;

type putServiceMappingSchemaType =z.infer<typeof putServiceMappingSchema>;

type donorSchemaType = Prisma.DonorCreateInput;

type serviceMappingUpdateType=Prisma.DivyangServiceMappingUpdateInput;





export {
  postServiceMappingRequestSchema,
  putServiceMappingSchema,
  postServiceMappingRequestSchemaType,
  postServiceMappingType,
  postNonSevaKendraFollowUpType,
  putServiceMappingSchemaType,
  donorSchemaType,
  serviceMappingUpdateType
  
};
